﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        public ActionResult<IEnumerable<Quote>> GetQuote()
        {
            return _context.Quotes.ToList();
        }

        [HttpPost]
        public ActionResult<Quote> PostQuote(Quote quote)
        {
            bool quoteExists = _context.Quotes.Any(q => (q.Email == quote.Email || q.PhoneNumber == quote.PhoneNumber) && q.EventType == quote.EventType && q.IsActive == true);

            if (!quoteExists) {
                _context.Quotes.Add(quote);
                _context.SaveChanges();

                return CreatedAtAction("GetQuote", new { id = quote.Id }, quote);
            }

            return Conflict(new { message = "There is already a quote in progress" });

        }
    }
}