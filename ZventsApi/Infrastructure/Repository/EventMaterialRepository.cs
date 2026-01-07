using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Models;

namespace ZventsApi.Infrastructure.Repository
{
    public class EventMaterialRepository(ZventsDbContext context)
        : IEventMaterialRepository
    {
        private readonly ZventsDbContext _context = context;

        public async Task<IEnumerable<EventMaterial>> GetByEventIdAsync(Guid eventId)
        {
            return await _context.EventMaterials
                .Where(em => em.EventId == eventId)
                .ToListAsync();
        }
    }
}
