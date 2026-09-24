using System.ComponentModel.DataAnnotations;

namespace ZventsApi.Models
{
    /// <summary>
    /// One logged-in browser/device. A user can hold several sessions at once, each with
    /// its own rotating refresh token.
    /// </summary>
    public class UserSession
    {
        [Key]
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;

        [Required]
        public string RefreshTokenHash { get; set; } = null!;

        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
