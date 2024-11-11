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
            var activeEvents = await _context
                .Events.Where(dbEvent => dbEvent.IsDeleted == false)
                .ToListAsync();

            return Ok(activeEvents);
        }

        [HttpGet("active-events")]
        public async Task<ActionResult<IEnumerable<ActiveEventDto>>> GetActiveEventsAsync()
        {
            var activeEvents = await _context
                .Events.Include(e => e.Client)
                .Where(e => e.IsDeleted == false)
                .Select(e => new ActiveEventDto
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
                })
                .OrderByDescending(dbEvent => dbEvent.CreatedDate)
                .ToListAsync();

            return Ok(activeEvents);
        }

        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(CreateEventDto createEventDto)
        {
            bool eventExists = _context.Events.Any(dbEvent =>
                (
                    dbEvent.Name == createEventDto.Name
                    && dbEvent.ClientId == createEventDto.ClientId
                    && dbEvent.Type == createEventDto.Type
                    && dbEvent.ZipCode == createEventDto.ZipCode
                    && dbEvent.StartDate == createEventDto.StartDate
                    && dbEvent.StartTime == createEventDto.StartTime
                    && dbEvent.IsDeleted == false
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
                            Quantity = materialDto.Quantity,
                            MaterialPrice = material.Price,
                            MaterialName = material.Name
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
            var @event = _context.Events.FirstOrDefault(dbEvent => dbEvent.Id == id);

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        [HttpGet("clientId/{clientId}")]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventByClientId(Guid clientId)
        {
            return await _context
                .Events.Where(dbEvent => dbEvent.ClientId == clientId)
                .ToArrayAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(Guid id, UpdateEventDto updateEventDto)
        {
            var eventEntity = await _context
                .Events.Include(dbEvent => dbEvent.EventMaterials)
                .ThenInclude(dbMaterial => dbMaterial.Material)
                .FirstOrDefaultAsync(dbEvent => dbEvent.Id == id);

            bool duplicatedEvent = _context.Events.Any(dbEvent =>
                (
                    dbEvent.Name == updateEventDto.Name
                    && dbEvent.ClientId == updateEventDto.ClientId
                    && dbEvent.Type == updateEventDto.Type
                    && dbEvent.ZipCode == updateEventDto.ZipCode
                    && dbEvent.StartDate == updateEventDto.StartDate
                    && dbEvent.StartTime == updateEventDto.StartTime
                    && dbEvent.IsDeleted == false
                )
            );

            if (eventEntity == null)
            {
                return NotFound($"Event with ID {id} not found.");
            }
            if (duplicatedEvent)
            {
                return Conflict(new { message = "There is already a Event in progress" });
            }
            else if (!duplicatedEvent)
            {
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
                            Event = eventEntity,
                            Material = material,
                            Quantity = materialDto.Quantity,
                            MaterialPrice = material.Price,
                            MaterialName = material.Name
                        }
                    );
                }

                _context.Entry(eventEntity).State = EntityState.Modified;
            }

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
            return _context.Events.Any(dbEvent => dbEvent.Id == id);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> SoftDeletEvent(Guid id)
        {
            var eventToDelete = await _context.Events.FindAsync(id);

            if (eventToDelete == null)
            {
                return NotFound();
            }

            eventToDelete.IsDeleted = true;
            _context.Entry(eventToDelete).State = EntityState.Modified;

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
