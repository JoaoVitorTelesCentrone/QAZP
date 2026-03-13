using ZventsApi.DTOs.Event;
using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Services
{
    public interface IEventService
    {
        Task<Event?> GetByIdAsync(Guid id);
        Task<IEnumerable<ActiveEventDto>> GetActiveEventsAsync();
        Task<Event> CreateEventAsync(CreateEventDto dto);
        Task<bool> UpdateEventAsync(Guid id, UpdateEventDto dto);
        Task<bool> SoftDeleteEventAsync(Guid id);
        Task<bool> DeleteEventAsync(Guid id);
    }
}
