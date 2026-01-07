using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Repositories
{
    public interface IMaterialRepository
    {
        Task<IEnumerable<Material>> GetAllAsync();
        Task<Material?> GetByIdAsync(Guid id);
        Task<IEnumerable<Material>> GetByCategoryAsync(MaterialCategory category);
        Task<IEnumerable<Material>> GetByNameAsync(string name);
        Task AddAsync(Material material);
        Task UpdateAsync(Material material);
        Task DeleteAsync(Material material);
    }
}
