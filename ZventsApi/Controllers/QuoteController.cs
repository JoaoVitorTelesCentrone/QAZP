using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController(ZventsDbContext context) : ControllerBase
    {
        private readonly ZventsDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuoteAsync()
        {
            var activeQuotes = await _context
                .Quotes.Where(dbQuote => dbQuote.IsDeleted == false)
                .OrderBy(dbQuote => dbQuote.CreatedDate)
                .ToListAsync();

            return Ok(activeQuotes);
            ;
        }

        [HttpPost]
        public ActionResult<Quote> PostQuote(Quote quote)
        {
            bool quoteExists = _context.Quotes.Any(dbQuote =>
                (dbQuote.Email == quote.Email || dbQuote.PhoneNumber == quote.PhoneNumber)
                && dbQuote.EventType == quote.EventType
                && dbQuote.IsDeleted == true
            );

            if (!quoteExists)
            {
                _context.Quotes.Add(quote);
                _context.SaveChanges();

                return CreatedAtAction(nameof(PostQuote), new { id = quote.Id }, quote);
            }

            return Conflict(new { message = "There is already a quote in progress" });
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> SoftDeleteQuote(Guid id)
        {
            var quoteToDelete = await _context.Quotes.FindAsync(id);

            if (quoteToDelete == null)
            {
                return NotFound();
            }

            quoteToDelete.IsDeleted = true;
            _context.Entry(quoteToDelete).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuoteExists(id))
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

        private bool QuoteExists(Guid id)
        {
            return _context.Quotes.Any(quote => quote.Id == id);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteQuote(Guid id)
        {
            var quoteToDelete = _context.Quotes.Find(id);

            if (quoteToDelete == null)
            {
                return NotFound();
            }

            _context.Quotes.Remove(quoteToDelete);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
