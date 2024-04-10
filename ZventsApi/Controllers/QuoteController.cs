using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        private readonly ZventsDbContext _context;

        public QuoteController(ZventsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [EnableCors("AllowSpecificOrigin")] // Habilitar o CORS especificando a política de CORS
        public ActionResult<IEnumerable<Quote>> GetQuote()
        {
            return _context.Quotes.ToList();
        }

        [HttpPost]
        [EnableCors("AllowSpecificOrigin")] // Habilitar o CORS especificando a política de CORS
        public ActionResult<Quote> PostQuote(Quote quote)
        {
            _context.Quotes.Add(quote);
            _context.SaveChanges();

            return CreatedAtAction("GetQuote", new { id = quote.Id }, quote);
        }
    }
}
