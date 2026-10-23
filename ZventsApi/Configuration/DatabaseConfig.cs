using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ZventsApi.Models;

namespace ZventsApi.Configuration;

public static class DatabaseConfig
{
    public static IServiceCollection AddDatabase(
        this IServiceCollection services,
        IConfiguration configuration,
        IHostEnvironment environment)
    {
        var connectionString = configuration.GetConnectionString("Default");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "ConnectionStrings:Default is not configured. Set it in appsettings.json " +
                "or via the ConnectionStrings__Default environment variable.");
        }

        // A relative SQLite path would otherwise resolve against whatever directory the
        // process was started from, silently opening (or creating) a different database.
        var builder = new SqliteConnectionStringBuilder(connectionString);
        if (builder.DataSource != ":memory:" && !Path.IsPathRooted(builder.DataSource))
        {
            builder.DataSource = Path.Combine(environment.ContentRootPath, builder.DataSource);
        }

        services.AddDbContext<ZventsDbContext>(options =>
            options.UseSqlite(builder.ToString()));

        return services;
    }

    // Brings the schema up to date before the API starts serving, so a deploy can't run
    // new code against an old database.
    public static void ApplyMigrations(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ZventsDbContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<ZventsDbContext>>();

        var pending = db.Database.GetPendingMigrations().ToList();
        logger.LogInformation("Banco de dados: {DataSource}", db.Database.GetDbConnection().DataSource);
        if (pending.Count == 0) return;

        logger.LogInformation("Aplicando migrations pendentes: {Migrations}", string.Join(", ", pending));
        db.Database.Migrate();
    }
}
