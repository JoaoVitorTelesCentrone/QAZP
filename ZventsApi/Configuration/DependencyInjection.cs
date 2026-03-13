using Microsoft.Extensions.DependencyInjection;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.Application.Services;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Infrastructure.Repositories;
using ZventsApi.Infrastructure.Repository;

namespace ZventsApi.Configuration
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IDashboardRepository, DashboardRepository>();
            services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped<IQuoteRepository, QuoteRepository>();
            services.AddScoped<IQuoteService, QuoteService>();
            services.AddScoped<IClientRepository, ClientRepository>();
            services.AddScoped<IClientService, ClientService>();
            services.AddScoped<IMaterialRepository, MaterialRepository>();
            services.AddScoped<IMaterialService, MaterialService>();
            services.AddScoped<IEventMaterialRepository, EventMaterialRepository>();
            services.AddScoped<IEventMaterialService, EventMaterialService>();
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<IEventService, EventService>();

            return services;
        }
    }
}
