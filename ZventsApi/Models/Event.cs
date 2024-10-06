using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZventsApi.Models
{
    public class CreateEventDto
    {
        public required string Name { get; set; }
        public EventType Type { get; set; }
        public EventStatus Status { get; set; }
        public Guid ClientId { get; set; }
        public DateOnly StartDate { get; set; }
        public TimeOnly StartTime { get; set; }
        public DateOnly EndDate { get; set; }
        public TimeOnly EndTime { get; set; }
        public required string ZipCode { get; set; }
        public required string AddressName { get; set; }
        public required string AddressNumber { get; set; }
        public string? AddressComplement { get; set; }
        public required string District { get; set; }
        public required string State { get; set; }
        public required string City { get; set; }
        public int? EstimatedAudience { get; set; }
        public List<MaterialDto> Materials { get; set; } = new List<MaterialDto>();
        public decimal? TotalAmount { get; set; }
    }

    public class UpdateEventDto
    {
        public required string Name { get; set; }
        public EventType Type { get; set; }
        public EventStatus Status { get; set; }
        public Guid ClientId { get; set; }
        public DateOnly StartDate { get; set; }
        public TimeOnly StartTime { get; set; }
        public DateOnly EndDate { get; set; }
        public TimeOnly EndTime { get; set; }
        public required string ZipCode { get; set; }
        public required string AddressName { get; set; }
        public required string AddressNumber { get; set; }
        public string? AddressComplement { get; set; }
        public required string District { get; set; }
        public required string State { get; set; }
        public required string City { get; set; }
        public int? EstimatedAudience { get; set; }
        public List<MaterialDto> Materials { get; set; } = [];
        public decimal? TotalAmount { get; set; }
        public bool? IsDeleted { get; set; }
    }

    public class ActiveEventDto
    {
        public string ClientFullName { get; set; }
        public string Title { get; set; }
        public EventType Type { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int? EstimatedAudience { get; set; }
        public decimal? TotalAmount { get; set; }
    }


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
        public string Name { get; set; }

        [Required(ErrorMessage = "Type is required")]
        public EventType Type { get; set; }

        [Required(ErrorMessage = "Status is required")]
        public EventStatus Status { get; set; }

        [Required(ErrorMessage = "ClientId is required")]
        public Guid ClientId { get; set; }
        public Client? Client { get; set; }

        [Required(ErrorMessage = "StartDate is required")]
        public DateOnly StartDate { get; set; }

        [Required(ErrorMessage = "StarTime is required")]
        public TimeOnly StartTime { get; set; }

        [Required(ErrorMessage = "EndDate is required")]
        public DateOnly EndDate { get; set; }

        [Required(ErrorMessage = "EndTime is required")]
        public TimeOnly EndTime { get; set; }

        [Required(ErrorMessage = "ZipCode is required")]
        public string ZipCode { get; set; }

        [Required(ErrorMessage = "AddressName is required")]
        public string AddressName { get; set; }

        [Required(ErrorMessage = "AddressNumber is required")]
        public string AddressNumber { get; set; }
        public string? AddressComplement { get; set; }

        [Required(ErrorMessage = "District is required")]
        public string District { get; set; }

        [Required(ErrorMessage = "State is required")]
        public string State { get; set; }

        [Required(ErrorMessage = "City is required")]
        public string City { get; set; }
        public int? EstimatedAudience { get; set; }
        public virtual ICollection<EventMaterial> EventMaterials { get; set; } = [];
        public decimal? TotalAmount { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool? IsDeleted { get; set; }

        public Event()
        {
            IsDeleted = false;
            CreatedDate = DateTime.Now;
            Status = 0;
        }
    }
}
