using System.ComponentModel.DataAnnotations;

namespace ZventsApi.DTOs.Quote
{
    public class CreateQuoteDto
    {
        [Required, StringLength(200)]
        public required string FullName { get; set; }

        [Required, EmailAddress]
        public required string Email { get; set; }

        [Required, Phone]
        public required string PhoneNumber { get; set; }

        [Required]
        public required string EventType { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "EstimatedAudience must be greater than zero")]
        public int? EstimatedAudience { get; set; }
    }
}
