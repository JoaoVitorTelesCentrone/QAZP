using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.Event;
using ZventsApi.Models;

namespace ZventsApi.Application.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMaterialRepository _materialRepository;

        public EventService(
            IEventRepository eventRepository,
            IMaterialRepository materialRepository)
        {
            _eventRepository = eventRepository;
            _materialRepository = materialRepository;
        }

        public async Task<Event?> GetByIdAsync(Guid id)
        {
            return await _eventRepository.GetByIdAsync(id);
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

        public async Task<Event> CreateEventAsync(CreateEventDto dto)
        {
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
                EstimatedAudience = dto.EstimatedAudience,
                TotalAmount = dto.TotalAmount
            };

            foreach (var materialDto in dto.Materials)
            {
                var material = await _materialRepository.GetByIdAsync(materialDto.MaterialId);
                if (material == null)
                    throw new Exception($"Material {materialDto.MaterialId} não encontrado");

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

            await _eventRepository.AddAsync(eventEntity);
            return eventEntity;
        }

        public async Task<bool> UpdateEventAsync(Guid id, UpdateEventDto dto)
        {
            var eventEntity = await _eventRepository.GetByIdAsync(id);
            if (eventEntity == null) return false;

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
            eventEntity.TotalAmount = dto.TotalAmount;

            eventEntity.EventMaterials.Clear();

            foreach (var materialDto in dto.Materials)
            {
                var material = await _materialRepository.GetByIdAsync(materialDto.MaterialId);
                if (material == null)
                    throw new Exception($"Material {materialDto.MaterialId} não encontrado");

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
            var eventEntity = await _eventRepository.GetByIdAsync(id);
            if (eventEntity == null) return false;

            await _eventRepository.DeleteAsync(eventEntity);
            return true;
        }
    }
}
