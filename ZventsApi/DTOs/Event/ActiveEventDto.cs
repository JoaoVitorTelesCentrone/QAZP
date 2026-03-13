using ZventsApi.Models;

namespace ZventsApi.DTOs.Event
{
    public class ActiveEventDto
    {
        public Guid Id { get; set; }
        public string ClientFullName { get; set; } = null!;
        public string Name { get; set; } = null!;
        public EventType Type { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int? EstimatedAudience { get; set; }
        public decimal? TotalAmount { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
