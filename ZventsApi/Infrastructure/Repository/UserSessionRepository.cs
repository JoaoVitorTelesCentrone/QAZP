using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Models;

namespace ZventsApi.Infrastructure.Repositories
{
    public class UserSessionRepository(ZventsDbContext context) : IUserSessionRepository
    {
        private readonly ZventsDbContext _context = context;

        public async Task<UserSession?> GetByRefreshTokenHashAsync(string refreshTokenHash)
        {
            return await _context.UserSessions
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.RefreshTokenHash == refreshTokenHash);
        }

        public async Task AddAsync(UserSession session)
        {
            _context.UserSessions.Add(session);
            await _context.SaveChangesAsync();
        }

        // Conditional update: only succeeds if nobody rotated this session since it was read,
        // so two concurrent refreshes with the same token can't both win.
        public async Task<bool> TryRotateAsync(Guid sessionId, string currentHash, string newHash, DateTime newExpiresAt)
        {
            var updated = await _context.UserSessions
                .Where(s => s.Id == sessionId && s.RefreshTokenHash == currentHash)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(x => x.RefreshTokenHash, newHash)
                    .SetProperty(x => x.ExpiresAt, newExpiresAt));
            return updated == 1;
        }

        public async Task DeleteAsync(UserSession session)
        {
            _context.UserSessions.Remove(session);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAllForUserAsync(Guid userId)
        {
            await _context.UserSessions
                .Where(s => s.UserId == userId)
                .ExecuteDeleteAsync();
        }

        public async Task DeleteExpiredForUserAsync(Guid userId)
        {
            var now = DateTime.UtcNow;
            await _context.UserSessions
                .Where(s => s.UserId == userId && s.ExpiresAt <= now)
                .ExecuteDeleteAsync();
        }
    }
}
