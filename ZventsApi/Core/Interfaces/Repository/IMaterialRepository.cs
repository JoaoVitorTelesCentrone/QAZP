using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Repositories
{
    public interface IMaterialRepository
    {
        Task<IReadOnlyCollection<Material>> GetAllAsync();
        Task<Material?> GetByIdAsync(Guid id);
        Task<IReadOnlyCollection<Material>> GetByCategoryAsync(MaterialCategory category);
        Task<IReadOnlyCollection<Material>> GetByNameAsync(string name);
        Task AddAsync(Material material);
        Task UpdateAsync(Material material);
        Task DeleteAsync(Material material);
    }
}
