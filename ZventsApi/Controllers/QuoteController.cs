using Microsoft.AspNetCore.Mvc;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.Quote;

namespace ZventsApi.Controllers
{
    [Route("api/quote")]
    [ApiController]
    public class QuoteController(IQuoteService quoteService) : ControllerBase
    {
        private readonly IQuoteService _quoteService = quoteService;

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
        public async Task<IActionResult> PostQuote(CreateQuoteDto dto)
        {
            var created = await _quoteService.CreateQuoteAsync(dto);
            if (created == null)
                return Conflict(new { message = "There is already a quote in progress" });

            return CreatedAtAction(nameof(PostQuote), new { id = created.Id }, created);
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
