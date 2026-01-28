using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.DTOs.Dashboard;
using ZventsApi.Models;

namespace ZventsApi.Infrastructure.Repository
{
    public class DashboardRepository(ZventsDbContext context) : IDashboardRepository
    {
        private readonly ZventsDbContext _context = context;

        public async Task<int> GetClientsCountAsync()
        {
            return await _context.Clients
                .CountAsync(c => !c.IsDeleted);
        }

        public async Task<int> GetActiveUsersCountAsync()
        {
            return await _context.Users
                .CountAsync(u => !u.IsDeleted && u.UserStatus == UserStatus.Active);
        }

        public async Task<int> GetEventsCountAsync()
        {
            return await _context.Events
                .CountAsync(e => e.IsDeleted == false || e.IsDeleted == null);
        }

        public async Task<List<DashboardEventDto>> GetEventsAsync()
        {
            return await _context.Events
                .Where(e => e.IsDeleted == false || e.IsDeleted == null)
                .OrderByDescending(e => e.CreatedDate)
                .Select(e => new DashboardEventDto
                {
                    Name = e.Name,
                    Type = e.Type.ToString(),
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    EstimatedAudience = e.EstimatedAudience,
                    TotalAmount = e.TotalAmount,
                    CreatedDate = e.CreatedDate
                })
                .ToListAsync();
        }
    }
}
