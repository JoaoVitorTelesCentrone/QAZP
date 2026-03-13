namespace ZventsApi.Models;
using ZventsApi.DTOs.User;

public class UpdateUserRequestDto
{
    public string Name { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Username { get; set; } = null!;
    public UserRole Role { get; set; }
    public UserStatus UserStatus { get; set; }
}
