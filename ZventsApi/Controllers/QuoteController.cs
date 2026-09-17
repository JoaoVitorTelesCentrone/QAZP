using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.Quote;

namespace ZventsApi.Controllers
{
    [Route("api/quote")]
    [ApiController]
    [Authorize]
    public class QuoteController(IQuoteService quoteService, ILogger<QuoteController> logger) : ControllerBase
    {
        private readonly IQuoteService _quoteService = quoteService;
        private readonly ILogger<QuoteController> _logger = logger;

        [HttpGet("active-quotes")]
        public async Task<IActionResult> GetActiveQuotes()
        {
            var quotes = await _quoteService.GetActiveAsync();
            return Ok(quotes);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllQuotes()
        {
            var quotes = await _quoteService.GetAllAsync();
            return Ok(quotes);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateQuote(CreateQuoteDto dto)
        {
            var created = await _quoteService.CreateQuoteAsync(dto);
            if (created == null)
            {
                _logger.LogWarning("Tentativa de criar orçamento já em andamento para: {Email}", dto.Email);
                return Conflict(new { message = "There is already a quote in progress" });
            }

            _logger.LogInformation("Orçamento criado: {QuoteId}", created.Id);
            return CreatedAtAction(nameof(CreateQuote), new { id = created.Id }, created);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> SoftDeleteQuote(Guid id)
        {
            var success = await _quoteService.SoftDeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote(Guid id)
        {
            var success = await _quoteService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
