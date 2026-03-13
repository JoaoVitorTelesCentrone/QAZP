using ZventsApi.DTOs.Dashboard;

namespace ZventsApi.Application.Interfaces.Services
{
    public interface IDashboardService
    {
        Task<DashboardDto> GetDashboardAsync();
    }
}
