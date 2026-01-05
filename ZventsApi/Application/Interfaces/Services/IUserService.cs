using ZventsApi.DTOs.User;
namespace ZventsApi.Application.Interfaces.Services
{

    public interface IUserService
    {
        Task<IEnumerable<UserListDto>> GetActiveUsersAsync();
    }
}
