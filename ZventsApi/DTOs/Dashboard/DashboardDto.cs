namespace ZventsApi.DTOs.Dashboard
{
    public class DashboardDto
    {
        public int Clients { get; set; }
        public int Users { get; set; }
        public int Events { get; set; }
        public List<DashboardEventDto> EventDetails { get; set; } = new();
    }
}
