using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZventsApi.Application.Interfaces.Services;

namespace ZventsApi.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    [Authorize]
    public class DashboardController(IDashboardService dashboardService) : ControllerBase
    {
        private readonly IDashboardService _dashboardService = dashboardService;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var dashboard = await _dashboardService.GetDashboardAsync();
            return Ok(dashboard);
        }
    }
}
