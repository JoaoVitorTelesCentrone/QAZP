using ZventsApi.DTOs.EventMaterial;
using ZventsApi.Models;

namespace ZventsApi.DTOs.Event
{
    /// <summary>
    /// Everything the edit screen needs in a single response. The client is reduced to its
    /// name (it may have been soft-deleted since) and materials carry their current price.
    /// </summary>
    public class EventDetailDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public EventType Type { get; set; }
        public EventStatus Status { get; set; }

        public Guid ClientId { get; set; }
        public string ClientFullName { get; set; } = null!;

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
        public decimal? TotalAmount { get; set; }
        public DateTime CreatedDate { get; set; }

        public List<EventMaterialResponseDto> Materials { get; set; } = [];
    }
}
