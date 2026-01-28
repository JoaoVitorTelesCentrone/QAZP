using ZventsApi.DTOs.EventMaterial;

namespace ZventsApi.Application.Interfaces.Services
{
    public interface IEventMaterialService
    {
        Task<IEnumerable<EventMaterialResponseDto>> GetMaterialsByEventIdAsync(Guid eventId);
    }
}
