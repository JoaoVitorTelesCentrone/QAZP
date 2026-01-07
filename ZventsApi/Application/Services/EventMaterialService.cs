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

            return materials.Select(em => new EventMaterialResponseDto
            {
                MaterialId = em.MaterialId,
                MaterialName = em.MaterialName,
                MaterialPrice = em.MaterialPrice,
                Quantity = em.Quantity
            });
        }
    }
}
