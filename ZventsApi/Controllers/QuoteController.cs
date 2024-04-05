using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController(ZventsDbContext context) : ControllerBase
    {
        private readonly ZventsDbContext _context = context;

        // GET: api/Quote
        [HttpGet]
        public ActionResult<IEnumerable<Quote>> GetQuote()
        {
            return _context.Quotes.ToList();
        }

        // POST: api/Quote
        [HttpPost]
        public ActionResult<Quote> PostQuote(Quote quote)
        {
            _context.Quotes.Add(quote);
            _context.SaveChanges();

            return CreatedAtAction("GetQuote", new { id = quote.Id }, quote);
        }
    }
}