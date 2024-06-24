using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZventsApi.Models
{
    public class Quote
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Full name is required")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        [Required(ErrorMessage = "Event type is required")]
        public string EventType { get; set; }

        [Required(ErrorMessage = "Estimated audience is required")]
        public int EstimatedAudience { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }

        public Quote()
        {
            IsActive = true;
            CreatedDate = DateTime.Now;
        }
    }
}
