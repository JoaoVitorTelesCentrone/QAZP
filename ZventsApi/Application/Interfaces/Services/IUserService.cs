using ZventsApi.DTOs.User;

public interface IUserService
{
    Task<IEnumerable<UserListDto>> GetActiveUsersAsync();
}
