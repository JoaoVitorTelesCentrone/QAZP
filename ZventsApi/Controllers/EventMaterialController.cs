using Microsoft.AspNetCore.Mvc;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.EventMaterial;

namespace ZventsApi.Controllers
{
    [Route("api/eventMaterial")]
    [ApiController]
    public class EventMaterialController(IEventMaterialService service) : ControllerBase
    {
        private readonly IEventMaterialService _service = service;

        [HttpGet("event/{eventId}")]
        public async Task<ActionResult<IEnumerable<EventMaterialResponseDto>>> GetByEventId(Guid eventId)
        {
            var result = await _service.GetMaterialsByEventIdAsync(eventId);
            return Ok(result);
        }
    }
}
