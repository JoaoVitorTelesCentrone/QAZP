using ZventsApi.DTOs.Quote;

namespace ZventsApi.Application.Interfaces.Services
{
    public interface IQuoteService
    {
        Task<List<QuoteDto>> GetAllAsync();
        Task<List<QuoteDto>> GetActiveAsync();
        Task<QuoteDto?> CreateQuoteAsync(CreateQuoteDto dto);
        Task<bool> SoftDeleteAsync(Guid id);
        Task<bool> DeleteAsync(Guid id);
    }
}
