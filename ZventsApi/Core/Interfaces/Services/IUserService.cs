using ZventsApi.DTOs.User;
using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserListDto>> GetAllUsersAsync();
        Task<IEnumerable<UserListDto>> GetActiveUsersAsync();
        Task<UserListDto?> GetUserByIdAsync(Guid id);
        Task<UserListDto?> GetUserByNameAsync(string name);
        Task<UserListDto?> GetUserByUsernameAsync(string username);
        Task<UserLoginResult?> LoginAsync(LoginRequest request);
        Task<CreateUserResult?> CreateUserAsync(CreateUserRequest request);

        Task<UserListDto?> UpdateUserAsync(Guid id, UpdateUserRequestDto request);
        Task<bool> SoftDeleteUserAsync(Guid id);
        Task<bool> DeleteUserAsync(Guid id);
    }
}
