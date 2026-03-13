namespace ZventsApi.DTOs.Quote
{
    public class QuoteDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string EventType { get; set; } = string.Empty;
        public int? EstimatedAudience { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
