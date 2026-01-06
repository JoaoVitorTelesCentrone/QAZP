using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Interfaces.Repository;
using ZventsApi.DTOs.Quote;
using ZventsApi.Models;

namespace ZventsApi.Infrastructure.Repository
{
    public class QuoteRepository : IQuoteRepository
    {
        private readonly ZventsDbContext _context;

        public QuoteRepository(ZventsDbContext context)
        {
            _context = context;
        }

        public async Task<List<QuoteDto>> GetAllAsync()
        {
            return await _context.Quotes
                .Select(q => new QuoteDto
                {
                    Id = q.Id,
                    FullName = q.FullName ?? string.Empty,
                    Email = q.Email ?? string.Empty,
                    PhoneNumber = q.PhoneNumber ?? string.Empty,
                    EventType = q.EventType.ToString(),
                    EstimatedAudience = q.EstimatedAudience,
                    CreatedDate = q.CreatedDate
                })
                .ToListAsync();
        }

        public async Task<List<QuoteDto>> GetActiveAsync()
        {
            return await _context.Quotes
                .Where(q => !q.IsDeleted)
                .OrderBy(q => q.CreatedDate)
                .Select(q => new QuoteDto
                {
                    Id = q.Id,
                    FullName = q.FullName,
                    Email = q.Email ?? string.Empty,
                    PhoneNumber = q.PhoneNumber ?? string.Empty,
                    EventType = q.EventType.ToString(),
                    EstimatedAudience = q.EstimatedAudience,
                    CreatedDate = q.CreatedDate
                })
                .ToListAsync();
        }

        public async Task<Quote?> GetByIdAsync(Guid id)
        {
            return await _context.Quotes.FindAsync(id);
        }

        public async Task AddAsync(Quote quote)
        {
            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Quote quote)
        {
            _context.Entry(quote).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Quote quote)
        {
            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await _context.Quotes.AnyAsync(q => q.Id == id);
        }

        public async Task<bool> QuoteExistsAsync(CreateQuoteDto dto)
        {
            return await _context.Quotes.AnyAsync(q =>
                q.FullName == dto.FullName &&
                (q.Email == dto.Email || q.PhoneNumber == dto.PhoneNumber) &&
                q.EventType == dto.EventType &&
                !q.IsDeleted
            );
        }
    }
}
