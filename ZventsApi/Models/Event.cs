using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZventsApi.Models
{
    public enum EventType
    {
        Wedding,
        TradeShow,
        Party,
        Festival,
        Workshop,
        Exhibition,
        Launch,
        Championship,
        Convention,
        Ball,
        Seminar,
        Meeting,
        Campaign,
        Ceremony,
        Symposium,
    }

    public enum EventStatus
    {
        Created,
        Ongoing,
        Finalized,
        Canceled
    }

    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public required string Name { get; set; }

        [Required(ErrorMessage = "Type is required")]
        public EventType Type { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public EventStatus Status { get; set; }

        [Required(ErrorMessage = "ClientId is required")]
        public Guid ClientId { get; set; }
        public Client Client { get; set; } = default!;

        [Required(ErrorMessage = "StartDate is required")]
        public DateOnly StartDate { get; set; }

        [Required(ErrorMessage = "StarTime is required")]
        public TimeOnly StartTime { get; set; }

        [Required(ErrorMessage = "EndDate is required")]
        public DateOnly EndDate { get; set; }

        [Required(ErrorMessage = "EndTime is required")]
        public TimeOnly EndTime { get; set; }

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
        public int? EstimatedAudience { get; set; }
        public virtual ICollection<EventMaterial> EventMaterials { get; set; } = [];
        public decimal? TotalAmount { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; } = false;

        public Event()
        {
            IsDeleted = false;
            CreatedDate = DateTime.Now;
            Status = 0;
        }
    }
}
