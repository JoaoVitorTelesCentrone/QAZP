using System.ComponentModel.DataAnnotations;
using ZventsApi.Application.Validators;

namespace ZventsApi.DTOs.Client
{
    public class ClientRequestDto
    {
        [Required, StringLength(200)]
        public string FullName { get; set; } = null!;

        [Required, ValidDocument(ErrorMessage = "Invalid DocumentId")]
        public string DocumentId { get; set; } = null!;

        [Phone]
        public string? PhoneNumber { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string ZipCode { get; set; } = null!;

        [Required]
        public string AddressName { get; set; } = null!;

        [Required]
        public string AddressNumber { get; set; } = null!;

        public string? AddressComplement { get; set; }

        [Required]
        public string District { get; set; } = null!;

        [Required]
        public string State { get; set; } = null!;

        [Required]
        public string City { get; set; } = null!;
    }
}
