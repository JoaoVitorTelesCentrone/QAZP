using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventMaterialController(ZventsDbContext context) : ControllerBase
    {
        private readonly ZventsDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventMaterial>>> GetEventMaterialAsync()
        {
            return await _context.EventMaterials.OrderByDescending(x => x.CreatedDate).ToArrayAsync();
        }

        [HttpPost]
        public ActionResult<EventMaterial> PostEventMaterial(EventMaterial eventMaterial)
        {
            bool eventMaterialExists = _context.EventMaterials.Any(e => (e.EventId == eventMaterial.EventId && e.MaterialId == eventMaterial.MaterialId));

            if (!eventMaterialExists)
            {
                _context.EventMaterials.Add(eventMaterial);
                _context.SaveChanges();

                return CreatedAtAction(nameof(PostEventMaterial), new { id = eventMaterial.Id }, eventMaterial);
            }

            return Conflict(new { message = "This material has already been registered for this event" });
        }

        [HttpGet("eventId/{eventId}")]
        public async Task<ActionResult<IEnumerable<EventMaterial>>> GetEventMaterialByeventId(Guid eventId)
        {
            return await _context.EventMaterials.Where(e => e.EventId == eventId).ToArrayAsync();

        }

        [HttpPut("{id}")]
        public IActionResult EditEventMaterial(Guid id, EventMaterial updatedEventMaterial)
        {
            var eventMaterialToUpdate = _context.EventMaterials.Find(id);

            if (eventMaterialToUpdate == null)
            {
                return NotFound();
            }

            eventMaterialToUpdate.Quantity = updatedEventMaterial.Quantity;

            _context.SaveChanges();

            return Ok(eventMaterialToUpdate);
        }
    }
}