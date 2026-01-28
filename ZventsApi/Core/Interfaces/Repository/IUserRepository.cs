using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<IEnumerable<User>> GetActiveUsersAsync();
        Task<User?> GetByIdAsync(Guid id);
        Task<User?> GetByNameAsync(string name);
        Task<User?> GetByUsernameAsync(string username);
        Task<IEnumerable<User>> GetUsersByRoleAsync(UserRole role);

        Task<bool> ExistsByUsernameAsync(string username);

        Task AddAsync(User user);

        Task UpdateAsync(User user);

        Task DeleteAsync(User user);
    }
}
