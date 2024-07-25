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
                    Status = createEventDto.Status,
                    ClientId = createEventDto.ClientId,
                    StartDate = createEventDto.StartDate,
                    EndDate = createEventDto.EndDate,
                    StartTime = createEventDto.StartTime,
                    EndTime = createEventDto.EndTime,
                    ZipCode = createEventDto.ZipCode,
                    AddressName = createEventDto.AddressName,
                    AddressNumber = createEventDto.AddressNumber,
                    AddressComplement = createEventDto.AddressComplement,
                    District = createEventDto.District,
                    State = createEventDto.State,
                    City = createEventDto.City,
                    EstimatedAudience = createEventDto.EstimatedAudience,
                    EventMaterials = [],
                    TotalAmount = createEventDto.TotalAmount
                };

                foreach (var materialDto in createEventDto.Materials)
                {
                    var material = await _context.Materials.FindAsync(materialDto.MaterialId);
                    if (material == null)
                    {
                        return NotFound($"Material with ID {materialDto.MaterialId} not found.");
                    }
                    eventEntity.EventMaterials.Add(
                        new EventMaterial
                        {
                            Event = eventEntity,
                            Material = material,
                            Quantity = materialDto.Quantity
                        }
                    );
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
        public async Task<IActionResult> PutEvent(Guid id, UpdateEventDto updateEventDto)
        {
            var eventEntity = await _context
                .Events.Include(e => e.EventMaterials)
                .ThenInclude(em => em.Material)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (eventEntity == null)
            {
                return NotFound($"Event with ID {id} not found.");
            }

            eventEntity.Name = updateEventDto.Name;
            eventEntity.Type = updateEventDto.Type;
            eventEntity.Status = updateEventDto.Status;
            eventEntity.ClientId = updateEventDto.ClientId;
            eventEntity.StartDate = updateEventDto.StartDate;
            eventEntity.StartTime = updateEventDto.StartTime;
            eventEntity.EndDate = updateEventDto.EndDate;
            eventEntity.EndTime = updateEventDto.EndTime;
            eventEntity.ZipCode = updateEventDto.ZipCode;
            eventEntity.AddressName = updateEventDto.AddressName;
            eventEntity.AddressNumber = updateEventDto.AddressNumber;
            eventEntity.AddressComplement = updateEventDto.AddressComplement;
            eventEntity.District = updateEventDto.District;
            eventEntity.State = updateEventDto.State;
            eventEntity.City = updateEventDto.City;
            eventEntity.EstimatedAudience = updateEventDto.EstimatedAudience;
            eventEntity.TotalAmount = updateEventDto.TotalAmount;
            eventEntity.IsActive = updateEventDto.IsActive;

            eventEntity.EventMaterials.Clear();
            foreach (var materialDto in updateEventDto.Materials)
            {
                var material = await _context.Materials.FindAsync(materialDto.MaterialId);
                if (material == null)
                {
                    return NotFound($"Material with ID {materialDto.MaterialId} not found.");
                }

                eventEntity.EventMaterials.Add(
                    new EventMaterial
                    {
                        EventId = eventEntity.Id,
                        MaterialId = material.Id,
                        Quantity = materialDto.Quantity
                    }
                );
            }

            _context.Entry(eventEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool EventExists(Guid id)
        {
            return _context.Events.Any(e => e.Id == id);
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
