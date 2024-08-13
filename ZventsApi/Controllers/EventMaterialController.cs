using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventMaterialController(ZventsDbContext context) : ControllerBase
    {
        private readonly ZventsDbContext _context = context;

        [HttpGet("eventId/{eventId}")]
        public async Task<ActionResult<IEnumerable<EventMaterial>>> GetMaterialByEventId(
            Guid eventId
        )
        {
            return await _context.EventMaterials.Where(x => x.EventId == eventId).ToArrayAsync();
        }
    }
}
