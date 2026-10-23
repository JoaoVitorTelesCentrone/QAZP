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

        // The token that was current before the last rotation. It stays valid for a short
        // grace period so a client that never received the rotated token (lost response,
        // timeout) can still refresh instead of being logged out.
        public string? PreviousRefreshTokenHash { get; set; }
        public DateTime? RotatedAt { get; set; }

        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
