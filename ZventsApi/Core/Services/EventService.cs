using ZventsApi.Application.Exceptions;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.Event;
using ZventsApi.DTOs.EventMaterial;
using ZventsApi.Models;

namespace ZventsApi.Application.Services
{
    public class EventService(
        IEventRepository eventRepository,
        IMaterialRepository materialRepository,
        IClientRepository clientRepository) : IEventService
    {
        private readonly IEventRepository _eventRepository = eventRepository;
        private readonly IMaterialRepository _materialRepository = materialRepository;
        private readonly IClientRepository _clientRepository = clientRepository;

        public async Task<EventDetailDto?> GetByIdAsync(Guid id)
        {
            var eventEntity = await _eventRepository.GetByIdAsync(id);
            return eventEntity == null ? null : ToDetailDto(eventEntity);
        }

        public async Task<IEnumerable<ActiveEventDto>> GetActiveEventsAsync()
        {
            var events = await _eventRepository.GetActiveEventsAsync();

            return events.Select(e => new ActiveEventDto
            {
                Id = e.Id,
                Name = e.Name,
                Type = e.Type,
                StartDate = e.StartDate,
                EndDate = e.EndDate,
                EstimatedAudience = e.EstimatedAudience,
                TotalAmount = e.TotalAmount,
                ClientFullName = e.Client.FullName,
                CreatedDate = e.CreatedDate
            });
        }

        public async Task<EventDetailDto> CreateEventAsync(CreateEventDto dto)
        {
            ValidateSchedule(dto);
            await EnsureClientExistsAsync(dto.ClientId);
            var materials = await ResolveMaterialsAsync(dto, alreadyLinked: new Dictionary<Guid, Material>());

            var eventEntity = new Event
            {
                Name = dto.Name,
                Type = dto.Type,
                Status = dto.Status,
                ClientId = dto.ClientId,
                StartDate = dto.StartDate,
                StartTime = dto.StartTime,
                EndDate = dto.EndDate,
                EndTime = dto.EndTime,
                ZipCode = dto.ZipCode,
                AddressName = dto.AddressName,
                AddressNumber = dto.AddressNumber,
                AddressComplement = dto.AddressComplement,
                District = dto.District,
                State = dto.State,
                City = dto.City,
                EstimatedAudience = dto.EstimatedAudience
            };

            SetMaterials(eventEntity, dto, materials);

            await _eventRepository.AddAsync(eventEntity);

            // Reload with the client attached, which the new entity doesn't carry.
            var created = await _eventRepository.GetByIdAsync(eventEntity.Id);
            return ToDetailDto(created!);
        }

        public async Task<bool> UpdateEventAsync(Guid id, UpdateEventDto dto)
        {
            var eventEntity = await _eventRepository.GetByIdAsync(id);
            if (eventEntity == null) return false;

            ValidateSchedule(dto);
            // An event keeps its current client and materials even if they were soft-deleted
            // since, so it stays editable; only newly chosen ones must still be active.
            if (dto.ClientId != eventEntity.ClientId)
                await EnsureClientExistsAsync(dto.ClientId);
            var alreadyLinked = eventEntity.EventMaterials.ToDictionary(em => em.MaterialId, em => em.Material);
            var materials = await ResolveMaterialsAsync(dto, alreadyLinked);

            eventEntity.Name = dto.Name;
            eventEntity.Type = dto.Type;
            eventEntity.Status = dto.Status;
            eventEntity.ClientId = dto.ClientId;
            eventEntity.StartDate = dto.StartDate;
            eventEntity.StartTime = dto.StartTime;
            eventEntity.EndDate = dto.EndDate;
            eventEntity.EndTime = dto.EndTime;
            eventEntity.ZipCode = dto.ZipCode;
            eventEntity.AddressName = dto.AddressName;
            eventEntity.AddressNumber = dto.AddressNumber;
            eventEntity.AddressComplement = dto.AddressComplement;
            eventEntity.District = dto.District;
            eventEntity.State = dto.State;
            eventEntity.City = dto.City;
            eventEntity.EstimatedAudience = dto.EstimatedAudience;

            eventEntity.EventMaterials.Clear();
            SetMaterials(eventEntity, dto, materials);

            await _eventRepository.UpdateAsync(eventEntity);
            return true;
        }

        public async Task<bool> SoftDeleteEventAsync(Guid id)
        {
            var eventEntity = await _eventRepository.GetByIdAsync(id);
            if (eventEntity == null) return false;

            await _eventRepository.SoftDeleteAsync(eventEntity);
            return true;
        }

        public async Task<bool> DeleteEventAsync(Guid id)
        {
            var eventEntity = await _eventRepository.GetByIdAsync(id, includeDeleted: true);
            if (eventEntity == null) return false;

            await _eventRepository.DeleteAsync(eventEntity);
            return true;
        }

        private static EventDetailDto ToDetailDto(Event e) => new()
        {
            Id = e.Id,
            Name = e.Name,
            Type = e.Type,
            Status = e.Status,
            ClientId = e.ClientId,
            ClientFullName = e.Client.FullName,
            StartDate = e.StartDate,
            StartTime = e.StartTime,
            EndDate = e.EndDate,
            EndTime = e.EndTime,
            ZipCode = e.ZipCode,
            AddressName = e.AddressName,
            AddressNumber = e.AddressNumber,
            AddressComplement = e.AddressComplement,
            District = e.District,
            State = e.State,
            City = e.City,
            EstimatedAudience = e.EstimatedAudience,
            TotalAmount = e.TotalAmount,
            CreatedDate = e.CreatedDate,
            // Current name/price, matching what saving the event would apply.
            Materials = e.EventMaterials
                .Select(em => new EventMaterialResponseDto
                {
                    MaterialId = em.MaterialId,
                    MaterialName = em.Material.Name,
                    MaterialPrice = em.Material.Price,
                    Quantity = em.Quantity
                })
                .ToList()
        };

        private static void ValidateSchedule(CreateEventDto dto)
        {
            var start = dto.StartDate.ToDateTime(dto.StartTime);
            var end = dto.EndDate.ToDateTime(dto.EndTime);
            if (end < start)
                throw new BusinessRuleException("A data de término não pode ser anterior à data de início");
        }

        private async Task EnsureClientExistsAsync(Guid clientId)
        {
            if (await _clientRepository.GetClientByIdAsync(clientId) == null)
                throw new BusinessRuleException($"Cliente {clientId} não encontrado");
        }

        private async Task<Dictionary<Guid, Material>> ResolveMaterialsAsync(
            CreateEventDto dto, IReadOnlyDictionary<Guid, Material> alreadyLinked)
        {
            var duplicated = dto.Materials.GroupBy(m => m.MaterialId).FirstOrDefault(g => g.Count() > 1);
            if (duplicated != null)
                throw new BusinessRuleException($"Material {duplicated.Key} informado mais de uma vez");

            var materials = new Dictionary<Guid, Material>();
            foreach (var materialDto in dto.Materials)
            {
                var material = alreadyLinked.GetValueOrDefault(materialDto.MaterialId)
                    ?? await _materialRepository.GetByIdAsync(materialDto.MaterialId)
                    ?? throw new BusinessRuleException($"Material {materialDto.MaterialId} não encontrado");
                materials[material.Id] = material;
            }
            return materials;
        }

        // Every save re-prices the event with the materials' current name and price, so the
        // total follows price changes. It is always derived here, never taken from the request.
        private static void SetMaterials(Event eventEntity, CreateEventDto dto, Dictionary<Guid, Material> materials)
        {
            foreach (var materialDto in dto.Materials)
            {
                var material = materials[materialDto.MaterialId];
                eventEntity.EventMaterials.Add(new EventMaterial
                {
                    Event = eventEntity,
                    EventId = eventEntity.Id,
                    MaterialId = material.Id,
                    Material = material,
                    Quantity = materialDto.Quantity,
                    MaterialName = material.Name,
                    MaterialPrice = material.Price
                });
            }

            eventEntity.TotalAmount = eventEntity.EventMaterials.Sum(em => em.MaterialPrice * em.Quantity);
        }
    }
}
