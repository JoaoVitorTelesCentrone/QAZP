using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Repositories
{
    public interface IEventRepository
    {
        Task<Event?> GetByIdAsync(Guid id);
        Task<IReadOnlyCollection<Event>> GetActiveEventsAsync();
        Task AddAsync(Event entity);
        Task UpdateAsync(Event entity);
        Task SoftDeleteAsync(Event entity);
        Task DeleteAsync(Event entity);
    }
}
