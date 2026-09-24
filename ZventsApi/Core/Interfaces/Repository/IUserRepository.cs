using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<IReadOnlyCollection<User>> GetAllAsync();
        Task<IReadOnlyCollection<User>> GetActiveUsersAsync();
        Task<User?> GetByIdAsync(Guid id);
        Task<User?> GetByNameAsync(string name);
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByRefreshTokenHashAsync(string refreshTokenHash);

        Task<bool> ExistsByUsernameAsync(string username);

        Task AddAsync(User user);

        Task UpdateAsync(User user);

        Task DeleteAsync(User user);
    }
}
