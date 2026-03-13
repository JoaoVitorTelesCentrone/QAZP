using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ZventsApi.Models; 

namespace ZventsApi.Configuration;

public static class DatabaseConfig
{
    public static IServiceCollection AddDatabase(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ZventsDbContext>(options =>
            options.UseSqlite("Data Source=Zvents.db"));

        return services;
    }
}
