using System.ComponentModel.DataAnnotations;

namespace ZventsApi.DTOs.User
{
    public class RefreshTokenRequest
    {
        [Required]
        public string RefreshToken { get; set; } = null!;
    }
}
