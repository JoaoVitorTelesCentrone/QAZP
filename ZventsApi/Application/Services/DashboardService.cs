using ZventsApi.Application.Interfaces.Repository;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.Dashboard;

namespace ZventsApi.Application.Services
{
    public class DashboardService(IDashboardRepository dashboardRepository) : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository = dashboardRepository;

        public async Task<DashboardDto> GetDashboardAsync()
        {
            return new DashboardDto
            {
                Clients = await _dashboardRepository.GetClientsCountAsync(),
                Users = await _dashboardRepository.GetActiveUsersCountAsync(),
                Events = await _dashboardRepository.GetEventsCountAsync(),
                EventDetails = await _dashboardRepository.GetEventsAsync()
            };
        }
    }
}
