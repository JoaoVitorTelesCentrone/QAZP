using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Models;

namespace ZventsApi.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ZventsDbContext _context;

        public UserRepository(ZventsDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users
                .Where(u => u.IsDeleted == false || u.IsDeleted == null)
                .ToListAsync();
        }

        public async Task<IEnumerable<User>> GetActiveUsersAsync()
        {
            return await _context.Users
                .Where(u =>
                    (u.IsDeleted == false || u.IsDeleted == null) &&
                    u.UserStatus == UserStatus.Active
                )
                .ToListAsync();
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _context.Users.FirstOrDefaultAsync(u =>
                u.Id == id &&
                (u.IsDeleted == false || u.IsDeleted == null)
            );
        }

        public async Task<User?> GetByNameAsync(string name)
        {
            return await _context.Users.FirstOrDefaultAsync(u =>
                u.Name == name &&
                (u.IsDeleted == false || u.IsDeleted == null) &&
                u.UserStatus == UserStatus.Active
            );
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u =>
                u.Username == username &&
                (u.IsDeleted == false || u.IsDeleted == null) &&
                u.UserStatus == UserStatus.Active
            );
        }

        public async Task<IEnumerable<User>> GetUsersByRoleAsync(UserRole role)
        {
            return await _context.Users
                .Where(u =>
                    u.Role == role &&
                    (u.IsDeleted == false || u.IsDeleted == null) &&
                    u.UserStatus == UserStatus.Active
                )
                .ToListAsync();
        }

        public async Task<bool> ExistsByUsernameAsync(string username)
        {
            return await _context.Users.AnyAsync(u =>
                u.Username == username &&
                (u.IsDeleted == false || u.IsDeleted == null)
            );
        }

        public async Task AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}
