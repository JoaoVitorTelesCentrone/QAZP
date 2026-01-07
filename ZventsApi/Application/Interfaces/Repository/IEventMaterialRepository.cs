using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Repositories
{
    public interface IEventMaterialRepository
    {
        Task<IEnumerable<EventMaterial>> GetByEventIdAsync(Guid eventId);
    }
}
