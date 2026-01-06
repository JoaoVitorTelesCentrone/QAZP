using ZventsApi.Models;

namespace ZventsApi.DTOs.Dashboard
{
    public class DashboardEventDto
    {
        public required string Name { get; set; }
        public required string Type { get; set; }

        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

        public int? EstimatedAudience { get; set; }
        public decimal? TotalAmount { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
