using System.ComponentModel.DataAnnotations;
using ZventsApi.Models;

namespace ZventsApi.DTOs.User
{
    public class CreateUserRequest
    {
        [Required, StringLength(200)]
        public string Name { get; set; } = null!;

        [Required, StringLength(100)]
        public string Username { get; set; } = null!;

        [Required, MinLength(6)]
        public string Password { get; set; } = null!;

        public UserRole Role { get; set; }
    }
}
