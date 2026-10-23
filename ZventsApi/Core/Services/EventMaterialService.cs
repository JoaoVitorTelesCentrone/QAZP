using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.EventMaterial;

namespace ZventsApi.Application.Services
{
    public class EventMaterialService(IEventMaterialRepository repository)
        : IEventMaterialService
    {
        private readonly IEventMaterialRepository _repository = repository;

        public async Task<IEnumerable<EventMaterialResponseDto>> GetMaterialsByEventIdAsync(Guid eventId)
        {
            var materials = await _repository.GetByEventIdAsync(eventId);

            // Current name/price, not the values stored on the event: the edit screen totals
            // these, and saving re-prices the event with exactly the same values.
            return materials.Select(em => new EventMaterialResponseDto
            {
                MaterialId = em.MaterialId,
                MaterialName = em.Material.Name,
                MaterialPrice = em.Material.Price,
                Quantity = em.Quantity
            });
        }
    }
}
