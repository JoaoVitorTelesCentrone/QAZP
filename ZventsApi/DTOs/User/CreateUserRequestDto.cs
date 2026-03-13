using ZventsApi.Models;

namespace ZventsApi.DTOs.User
{
    public class CreateUserRequest
    {
        public string Name { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public UserRole Role { get; set; }
    }
}
