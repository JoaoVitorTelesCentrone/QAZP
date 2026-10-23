using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Models;

namespace ZventsApi.Infrastructure.Repository
{
    public class MaterialRepository(ZventsDbContext context) : IMaterialRepository
    {
        private readonly ZventsDbContext _context = context;

        public async Task<IReadOnlyCollection<Material>> GetAllAsync()
        {
            return await _context.Materials.ToListAsync();
        }

        public async Task<Material?> GetByIdAsync(Guid id, bool includeDeleted = false)
        {
            return await _context.Materials.FirstOrDefaultAsync(m => m.Id == id && (includeDeleted || !m.IsDeleted));
        }

        public async Task<IReadOnlyCollection<Material>> GetByCategoryAsync(MaterialCategory category)
        {
            return await _context.Materials.Where(m => m.Category == category && !m.IsDeleted).ToListAsync();
        }

        public async Task<IReadOnlyCollection<Material>> GetByNameAsync(string name)
        {
            return await _context.Materials.Where(m => m.Name == name && !m.IsDeleted).ToListAsync();
        }

        public async Task AddAsync(Material material)
        {
            _context.Materials.Add(material);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Material material)
        {
            _context.Materials.Update(material);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> IsUsedInEventsAsync(Guid materialId)
        {
            return await _context.EventMaterials.AnyAsync(em => em.MaterialId == materialId);
        }

        public async Task DeleteAsync(Material material)
        {
            _context.Materials.Remove(material);
            await _context.SaveChangesAsync();
        }
    }
}
