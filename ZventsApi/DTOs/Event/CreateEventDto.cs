using ZventsApi.Models;
using ZventsApi.DTOs.Event;

namespace ZventsApi.DTOs.Event
{
    public class CreateEventDto
    {
        public string Name { get; set; } = null!;
        public EventType Type { get; set; }
        public EventStatus Status { get; set; }
        public Guid ClientId { get; set; }
        public DateOnly StartDate { get; set; }
        public TimeOnly StartTime { get; set; }
        public DateOnly EndDate { get; set; }
        public TimeOnly EndTime { get; set; }
        public string ZipCode { get; set; } = null!;
        public string AddressName { get; set; } = null!;
        public string AddressNumber { get; set; } = null!;
        public string? AddressComplement { get; set; }
        public string District { get; set; } = null!;
        public string State { get; set; } = null!;
        public string City { get; set; } = null!;
        public int? EstimatedAudience { get; set; }
        public List<EventMaterialDto> Materials { get; set; } = [];
        public decimal? TotalAmount { get; set; }
    }
}
