using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ZventsApi.Configuration;
public static class AuthenticationConfig
{
    public static IServiceCollection AddJwtAuthentication(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var jwtKey = configuration["Jwt:Key"];
        if (string.IsNullOrWhiteSpace(jwtKey))
        {
            throw new InvalidOperationException(
                "Jwt:Key is not configured. Set it via user-secrets (dotnet user-secrets set \"Jwt:Key\" \"...\") " +
                "in Development, or via the Jwt__Key environment variable in other environments.");
        }

        var key = Encoding.UTF8.GetBytes(jwtKey);
        if (key.Length < 32)
        {
            // HS256 rejects keys shorter than 256 bits at token creation time; fail at startup instead.
            throw new InvalidOperationException(
                $"Jwt:Key must be at least 32 bytes long (current: {key.Length}).");
        }

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = configuration["Jwt:Audience"],
                ClockSkew = TimeSpan.FromSeconds(30)
            };
        });

        return services;
    }
}
