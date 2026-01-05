using ZventsApi.DTOs.User;
using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Services
{

    public interface IUserService
    {
        Task<IEnumerable<UserListDto>> GetAllUsersAsync();
        Task<IEnumerable<UserListDto>> GetActiveUsersAsync();
        Task<UserListDto?> GetUserByNameAsync(string name);
        Task<UserListDto?> GetUserByIdAsync(Guid id);
        Task<UserListDto?> GetUserByUsernameAsync(string username);
        Task<CreateUserResult?> CreateUserAsync(CreateUserRequest request);
        Task<UserLoginResult?> LoginAsync(LoginRequest request);
    }
}
