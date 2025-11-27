using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ZventsApi.Controllers;

namespace ZventsApi.Models
{
    public class Client
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "FullName is required")]
        public required string FullName { get; set; }

        [Required(ErrorMessage = "DocumentId is required")]
        [RegularExpression(@"^\d{11}$|^\d{14}$", ErrorMessage = "Invalid DocumentId")]
        [ValidDocument(ErrorMessage = "Invalid DocumentId")]
        public required string DocumentId { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }

        [Required(ErrorMessage = "ZipCode is required")]
        public required string ZipCode { get; set; }

        [Required(ErrorMessage = "AddressName is required")]
        public required string AddressName { get; set; }

        [Required(ErrorMessage = "AddressNumber is required")]
        public required string AddressNumber { get; set; }
        public string? AddressComplement { get; set; }

        [Required(ErrorMessage = "District is required")]
        public required string District { get; set; }

        [Required(ErrorMessage = "State is required")]
        public required string State { get; set; }

        [Required(ErrorMessage = "City is required")]
        public required string City { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool? IsDeleted { get; set; }

        public Client()
        {
            IsDeleted = false;
            CreatedDate = DateTime.Now;
        }
    }
    public class ClientDto
    {
        public Guid Id { get; set; }
        public required string FullName { get; set; }
        public required string DocumentId { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public DateTime CreatedDate { get; set; }
    }

}
