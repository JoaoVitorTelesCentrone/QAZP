using Microsoft.EntityFrameworkCore;
using ZventsApi.DTOs.User;
using ZventsApi.Models;
using ZventsApi.Application.Interfaces.Services;
using System.Runtime.InteropServices;

namespace ZventsApi.Application.Services
{
    public class UserService : IUserService
    {
        private readonly ZventsDbContext _context;

        public UserService(ZventsDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserListDto>> GetAllUsersAsync()
        {
            return await _context.Users
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
                .OrderByDescending(u => u.CreatedDate)
                .ToListAsync();
        }

        public async Task<UserListDto?> GetUserByNameAsync(string name)
        {
            return await _context.Users
                .Where(u => u.Name == name && u.IsDeleted == false && u.UserStatus == UserStatus.Active)
                .Select(u => new UserListDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    UserName = u.UserName,
                    CreatedDate = u.CreatedDate
                })
                .FirstOrDefaultAsync();
        }
        public async Task<UserListDto?> GetUserByIdAsync(Guid id)
        {
            return await _context.Users
                .Where(u => u.Id == id && u.IsDeleted == false && u.UserStatus == UserStatus.Active)
                .Select(u => new UserListDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    UserName = u.UserName,
                    CreatedDate = u.CreatedDate
                })
                .FirstOrDefaultAsync();
        }
    }
}


