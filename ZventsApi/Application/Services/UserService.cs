using Microsoft.EntityFrameworkCore;
using ZventsApi.DTOs.User;
using ZventsApi.Models;
using ZventsApi.Application.Interfaces.Services;

namespace ZventsApi.Application.Services
{
    public class UserService : IUserService
    {
        private readonly ZventsDbContext _context;

        public UserService(ZventsDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserListDto>> GetActiveUsersAsync()
        {
            return await _context.Users
                .Where(u => u.IsDeleted == false && u.UserStatus == UserStatus.Active)
                .OrderBy(u => u.CreatedDate)
                .Select(u => new UserListDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    UserName = u.UserName,
                    CreatedDate = u.CreatedDate
                })
                .ToListAsync();
        }
    }
}

