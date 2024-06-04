using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController(ZventsDbContext context) : ControllerBase
    {
        private readonly ZventsDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventAsync()
        {
            return await _context.Events.OrderByDescending(x => x.CreatedDate).ToArrayAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(CreateEventDto createEventDto)
        {
            bool eventExists = _context.Events.Any(e =>
                (
                    e.Name == createEventDto.Name
                    && e.Type == createEventDto.Type
                    && e.ClientId == createEventDto.ClientId
                    && e.IsActive == true
                )
            );

            if (!eventExists)
            {
                var eventEntity = new Event
                {
                    Name = createEventDto.Name,
                    Type = createEventDto.Type,
                    ClientId = createEventDto.ClientId,
                    StartAt = createEventDto.StartAt,
                    EndAt = createEventDto.EndAt,
                    ZipCode = createEventDto.ZipCode,
                    AddressName = createEventDto.AddressName,
                    AddressNumber = createEventDto.AddressNumber,
                    AddressComplement = createEventDto.AddressComplement,
                    District = createEventDto.District,
                    State = createEventDto.State,
                    City = createEventDto.City,
                    EstimatedAudience = createEventDto.EstimatedAudience,
                    Materials = []
                };

                foreach (var materialId in createEventDto.MaterialIds)
                {
                    var material = await _context.Materials.FindAsync(materialId);
                    if (material == null)
                    {
                        return NotFound($"Material with ID {materialId} not found.");
                    }
                    eventEntity.Materials.Add(material);
                }

                _context.Events.Add(eventEntity);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(PostEvent), new { id = eventEntity.Id }, eventEntity);
            }
            return Conflict(new { message = "There is already a Event in progress" });
        }

        [HttpGet("id/{id}")]
        public ActionResult<Event> GetEventById(Guid id)
        {
            var @event = _context.Events.FirstOrDefault(e => e.Id == id);

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        [HttpGet("clientId/{clientId}")]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventByClientIdy(Guid clientId)
        {
            return await _context.Events.Where(e => e.ClientId == clientId).ToArrayAsync();
        }

        [HttpPut("{id}")]
        public IActionResult Edit(Guid id, Event updatedEvent)
        {
            var eventToUpdate = _context.Events.Find(id);

            if (eventToUpdate == null)
            {
                return NotFound();
            }

            eventToUpdate.Name = updatedEvent.Name;
            eventToUpdate.Type = updatedEvent.Type;
            eventToUpdate.StartAt = updatedEvent.StartAt;
            eventToUpdate.EndAt = updatedEvent.EndAt;
            eventToUpdate.ZipCode = updatedEvent.ZipCode;
            eventToUpdate.AddressName = updatedEvent.AddressName;
            eventToUpdate.AddressNumber = updatedEvent.AddressNumber;
            eventToUpdate.AddressComplement = updatedEvent.AddressComplement;
            eventToUpdate.District = updatedEvent.District;
            eventToUpdate.State = updatedEvent.State;
            eventToUpdate.City = updatedEvent.City;
            eventToUpdate.EstimatedAudience = updatedEvent.EstimatedAudience;
            eventToUpdate.IsActive = updatedEvent.IsActive;

            _context.SaveChanges();

            return Ok(eventToUpdate);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(Guid id)
        {
            var eventToDelete = _context.Events.Find(id);

            if (eventToDelete == null)
            {
                return NotFound();
            }

            _context.Events.Remove(eventToDelete);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
