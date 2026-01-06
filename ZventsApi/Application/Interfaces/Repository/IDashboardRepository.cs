using ZventsApi.DTOs.Dashboard;

namespace ZventsApi.Application.Interfaces.Repository
{
    public interface IDashboardRepository
    {
        Task<int> GetClientsCountAsync();
        Task<int> GetActiveUsersCountAsync();
        Task<int> GetEventsCountAsync();
        Task<List<DashboardEventDto>> GetEventsAsync();
    }
}
