using ZventsApi.Application.Interfaces.Repository;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.Quote;
using ZventsApi.Models;

namespace ZventsApi.Application.Services
{
    public class QuoteService : IQuoteService
    {
        private readonly IQuoteRepository _repository;

        public QuoteService(IQuoteRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<QuoteDto>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<List<QuoteDto>> GetActiveAsync()
        {
            return await _repository.GetActiveAsync();
        }

        public async Task<QuoteDto?> CreateQuoteAsync(CreateQuoteDto dto)
        {
            bool exists = await _repository.QuoteExistsAsync(dto);
            if (exists) return null;

            var quote = new Quote
            {
                Id = Guid.NewGuid(),
                FullName = dto.FullName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                EventType = dto.EventType,
                EstimatedAudience = dto.EstimatedAudience ?? 0,
                CreatedDate = DateTime.UtcNow
            };

            await _repository.AddAsync(quote);

            return new QuoteDto
            {
                Id = quote.Id,
                FullName = quote.FullName,
                Email = quote.Email,
                PhoneNumber = quote.PhoneNumber,
                EventType = quote.EventType,
                EstimatedAudience = quote.EstimatedAudience,
                CreatedDate = quote.CreatedDate
            };
        }

        public async Task<bool> SoftDeleteAsync(Guid id)
        {
            var quote = await _repository.GetByIdAsync(id);
            if (quote == null) return false;

            quote.IsDeleted = true;
            await _repository.UpdateAsync(quote);
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var quote = await _repository.GetByIdAsync(id);
            if (quote == null) return false;

            await _repository.DeleteAsync(quote);
            return true;
        }
    }
}
