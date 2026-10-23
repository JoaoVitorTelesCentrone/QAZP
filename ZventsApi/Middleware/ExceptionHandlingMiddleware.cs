using System.Net;
using System.Text.Json;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Exceptions;

namespace ZventsApi.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger = logger;

    private const int SqliteConstraintError = 19;     // SQLITE_CONSTRAINT
    private const int SqliteForeignKeyError = 787;    // SQLITE_CONSTRAINT_FOREIGNKEY

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ConflictException ex)
        {
            _logger.LogWarning(ex, "Conflict on {Path}", context.Request.Path);
            await WriteProblemAsync(context, HttpStatusCode.Conflict, ex.Message);
        }
        catch (DbUpdateException ex) when (ex.InnerException is SqliteException { SqliteErrorCode: SqliteConstraintError } sqlite)
        {
            // Safety net for races the services' own checks can't catch (two requests
            // creating the same username at once, deleting something still referenced).
            _logger.LogWarning(ex, "Constraint violation on {Path}", context.Request.Path);
            var message = sqlite.SqliteExtendedErrorCode == SqliteForeignKeyError
                ? "O registro está vinculado a outros dados e não pode ser alterado ou excluído"
                : "Já existe um registro com esses dados";
            await WriteProblemAsync(context, HttpStatusCode.Conflict, message);
        }
        catch (BusinessRuleException ex)
        {
            _logger.LogWarning(ex, "Business rule violation on {Path}", context.Request.Path);
            await WriteProblemAsync(context, HttpStatusCode.BadRequest, ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception on {Path}", context.Request.Path);
            await WriteProblemAsync(context, HttpStatusCode.InternalServerError, "An unexpected error occurred.");
        }
    }

    private static Task WriteProblemAsync(HttpContext context, HttpStatusCode statusCode, string message)
    {
        // Once the response has started streaming we can no longer change status or headers.
        if (context.Response.HasStarted)
        {
            return Task.CompletedTask;
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;
        var payload = JsonSerializer.Serialize(new { message });
        return context.Response.WriteAsync(payload);
    }
}
