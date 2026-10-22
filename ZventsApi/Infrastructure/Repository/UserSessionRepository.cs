using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Models;

namespace ZventsApi.Infrastructure.Repositories
{
    public class UserSessionRepository(ZventsDbContext context) : IUserSessionRepository
    {
        private readonly ZventsDbContext _context = context;

        public async Task<UserSession?> GetByIdAsync(Guid sessionId)
        {
            return await _context.UserSessions
                .AsNoTracking()
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.Id == sessionId);
        }

        // Matches either the current token or the one it replaced; the caller decides
        // whether the previous one is still inside its grace period.
        public async Task<UserSession?> GetByRefreshTokenHashAsync(string refreshTokenHash)
        {
            return await _context.UserSessions
                .Include(s => s.User)
                .FirstOrDefaultAsync(s =>
                    s.RefreshTokenHash == refreshTokenHash ||
                    s.PreviousRefreshTokenHash == refreshTokenHash);
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
            var now = DateTime.UtcNow;
            var updated = await _context.UserSessions
                .Where(s => s.Id == sessionId && s.RefreshTokenHash == currentHash)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(x => x.PreviousRefreshTokenHash, currentHash)
                    .SetProperty(x => x.RotatedAt, now)
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

        public async Task<int> DeleteExpiredAsync()
        {
            var now = DateTime.UtcNow;
            return await _context.UserSessions
                .Where(s => s.ExpiresAt <= now)
                .ExecuteDeleteAsync();
        }
    }
}
