namespace ZventsApi.Models;
using System.ComponentModel.DataAnnotations;
using ZventsApi.DTOs.User;

public class UpdateUserRequestDto
{
    [Required, StringLength(200)]
    public string Name { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;

    [Required, StringLength(100)]
    public string Username { get; set; } = null!;

    public UserRole Role { get; set; }
    public UserStatus UserStatus { get; set; }
}
