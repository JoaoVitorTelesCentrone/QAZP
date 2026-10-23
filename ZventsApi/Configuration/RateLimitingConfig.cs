using System.Text.Json;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

namespace ZventsApi.Configuration;

public static class RateLimitingConfig
{
    public const string LoginPolicy = "login";
    public const string QuotePolicy = "quote";

    // Limits are per client IP and per fixed window. Login stays generous because a class
    // working from the same network shares one IP; the goal is to stop password guessing
    // and form spam, not normal use. Both are tunable under RateLimiting:<Policy>.
    public static IServiceCollection AddRateLimitingConfiguration(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.OnRejected = async (context, cancellationToken) =>
            {
                var response = context.HttpContext.Response;
                if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
                {
                    response.Headers.RetryAfter = ((int)Math.Ceiling(retryAfter.TotalSeconds)).ToString();
                }

                response.ContentType = "application/json";
                var payload = JsonSerializer.Serialize(new
                {
                    message = "Muitas tentativas em pouco tempo. Aguarde um instante e tente novamente."
                });
                await response.WriteAsync(payload, cancellationToken);
            };

            AddFixedWindowPolicy(options, configuration, LoginPolicy, defaultPermits: 20);
            AddFixedWindowPolicy(options, configuration, QuotePolicy, defaultPermits: 10);
        });

        return services;
    }

    private static void AddFixedWindowPolicy(
        RateLimiterOptions options,
        IConfiguration configuration,
        string policy,
        int defaultPermits)
    {
        var section = configuration.GetSection($"RateLimiting:{policy}");
        var permits = section.GetValue("PermitLimit", defaultPermits);
        var window = TimeSpan.FromSeconds(section.GetValue("WindowSeconds", 60));

        options.AddPolicy(policy, httpContext =>
            RateLimitPartition.GetFixedWindowLimiter(
                httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = permits,
                    Window = window,
                    QueueLimit = 0
                }));
    }
}
