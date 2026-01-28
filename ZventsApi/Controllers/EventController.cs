using Microsoft.AspNetCore.Mvc;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.Event;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [ApiController]
    [Route("api/event")]
    public class EventController(IEventService service) : ControllerBase
    {
        private readonly IEventService _service = service;

        [HttpGet("active-events")]
        public async Task<ActionResult<IEnumerable<ActiveEventDto>>> GetActiveEvents()
        {
            return Ok(await _service.GetActiveEventsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetById(Guid id)
        {
            var evt = await _service.GetByIdAsync(id);
            if (evt == null) return NotFound();
            return Ok(evt);
        }

        [HttpPost]
        public async Task<ActionResult<Event>> Create(CreateEventDto dto)
        {
            var evt = await _service.CreateEventAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = evt.Id }, evt);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateEventDto dto)
        {
            var success = await _service.UpdateEventAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> SoftDelete(Guid id)
        {
            var success = await _service.SoftDeleteEventAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _service.DeleteEventAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
