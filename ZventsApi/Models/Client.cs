using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ZventsApi.Application.Validators;

namespace ZventsApi.Models
{
    public class Client
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public string FullName { get; set; } = default!;

        [Required]
        [ValidDocument(ErrorMessage = "Invalid DocumentId")]
        public string DocumentId { get; set; } = default!;

        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }

        [Required]
        public string ZipCode { get; set; } = default!;

        [Required]
        public string AddressName { get; set; } = default!;

        [Required]
        public string AddressNumber { get; set; } = default!;

        public string? AddressComplement { get; set; }

        [Required]
        public string District { get; set; } = default!;

        [Required]
        public string State { get; set; } = default!;

        [Required]
        public string City { get; set; } = default!;

        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;
    }
}
