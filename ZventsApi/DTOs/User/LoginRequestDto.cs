using System.ComponentModel.DataAnnotations;

namespace ZventsApi.DTOs.User
{
    public class LoginRequest
    {
        [Required]
        public required string Username { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
