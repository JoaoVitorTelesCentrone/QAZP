using ZventsApi.DTOs.User;
namespace ZventsApi.Application.Interfaces.Services
{

    public interface IUserService
    {
        Task<IEnumerable<UserListDto>> GetAllUsersAsync();
        Task<IEnumerable<UserListDto>> GetActiveUsersAsync();
        Task<UserListDto?> GetUserByNameAsync(string name);
        Task<UserListDto?> GetUserByIdAsync(Guid id);
    }
}
