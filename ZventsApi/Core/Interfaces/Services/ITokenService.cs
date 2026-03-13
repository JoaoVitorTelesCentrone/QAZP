using ZventsApi.DTOs.User;

namespace ZventsApi.Application.Interfaces.Services
{
    public interface ITokenService
    {
        string GenerateToken(UserLoginResult user);
    }
}
