using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Repositories
{
    public interface IEventMaterialRepository
    {
        Task<IReadOnlyCollection<EventMaterial>> GetByEventIdAsync(Guid eventId);
    }
}
