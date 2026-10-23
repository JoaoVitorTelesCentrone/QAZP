using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Repositories
{
    public interface IUserSessionRepository
    {
        Task<UserSession?> GetByIdAsync(Guid sessionId);
        Task<UserSession?> GetByRefreshTokenHashAsync(string refreshTokenHash);
        Task AddAsync(UserSession session);
        Task<bool> TryRotateAsync(Guid sessionId, string currentHash, string newHash, DateTime newExpiresAt);
        Task DeleteAsync(UserSession session);
        Task DeleteAllForUserAsync(Guid userId);
        Task<int> DeleteExpiredAsync();
    }
}
