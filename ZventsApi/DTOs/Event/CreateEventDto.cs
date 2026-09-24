using System.ComponentModel.DataAnnotations;
using ZventsApi.Models;
using ZventsApi.DTOs.Event;

namespace ZventsApi.DTOs.Event
{
    public class CreateEventDto
    {
        [Required, StringLength(200)]
        public string Name { get; set; } = null!;

        public EventType Type { get; set; }
        public EventStatus Status { get; set; }

        [Required]
        public Guid ClientId { get; set; }

        public DateOnly StartDate { get; set; }
        public TimeOnly StartTime { get; set; }
        public DateOnly EndDate { get; set; }
        public TimeOnly EndTime { get; set; }

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

        [Range(1, int.MaxValue, ErrorMessage = "EstimatedAudience must be greater than zero")]
        public int? EstimatedAudience { get; set; }

        public List<EventMaterialDto> Materials { get; set; } = [];

        [Range(0, double.MaxValue, ErrorMessage = "TotalAmount must be zero or greater")]
        public decimal? TotalAmount { get; set; }
    }
}
