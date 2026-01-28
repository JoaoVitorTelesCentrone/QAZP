using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Models;

namespace ZventsApi.Infrastructure.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly ZventsDbContext _context;

        public EventRepository(ZventsDbContext context)
        {
            _context = context;
        }

        public async Task<Event?> GetByIdAsync(Guid id)
        {
            return await _context.Events
                .Include(e => e.Client)
                .Include(e => e.EventMaterials)
                .ThenInclude(em => em.Material)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<Event>> GetActiveEventsAsync()
        {
            return await _context.Events
                .Include(e => e.Client)
                .Where(e => !e.IsDeleted)
                .OrderByDescending(e => e.CreatedDate)
                .ToListAsync();
        }

        public async Task AddAsync(Event entity)
        {
            _context.Events.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Event entity)
        {
            _context.Events.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(Event entity)
        {
            entity.IsDeleted = true;
            _context.Events.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Event entity)
        {
            _context.Events.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
