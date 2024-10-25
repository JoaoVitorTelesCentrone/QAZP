using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ZventsDbContext _context;

        public DashboardController(ZventsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<object>> GetDashboardData()
        {

            var clientCount = await _context.Clients
                .CountAsync(client => client.IsDeleted == false);
                
            var userCount = await _context.Users
                .CountAsync(user => user.IsDeleted == false && user.UserStatus == UserStatus.Active);

            var eventCount = await _context.Events
                .CountAsync(eventItem => eventItem.IsDeleted == false);

            var events = await _context.Events
                .Where(eventItem => eventItem.IsDeleted == false)
                .Select(eventItem => new {
                    eventItem.Name,
                    eventItem.Type,                    
                    eventItem.StartDate,
                    eventItem.EndDate,
                    eventItem.EstimatedAudience,
                    eventItem.TotalAmount,
                    eventItem.CreatedDate
                })
                .OrderByDescending(dbEvent => dbEvent.CreatedDate)
                .ToListAsync();

            var result = new {
                Clients = clientCount,
                Users = userCount,
                Events = eventCount,
                EventDetails = events
            };

            return Ok(result);
        }
    }
}
