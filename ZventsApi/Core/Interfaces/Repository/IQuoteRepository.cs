using ZventsApi.DTOs.Quote;
using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Repositories
{
    public interface IQuoteRepository
    {
        Task<List<QuoteDto>> GetAllAsync();
        Task<List<QuoteDto>> GetActiveAsync();
        Task<Quote?> GetByIdAsync(Guid id);
        Task AddAsync(Quote quote);
        Task UpdateAsync(Quote quote);
        Task DeleteAsync(Quote quote);
        Task<bool> ExistsAsync(Guid id);
        Task<bool> QuoteExistsAsync(CreateQuoteDto dto);
    }
}
