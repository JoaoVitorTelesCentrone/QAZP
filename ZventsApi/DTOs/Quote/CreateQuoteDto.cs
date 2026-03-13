namespace ZventsApi.DTOs.Quote
{
    public class CreateQuoteDto
    {
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public required string EventType { get; set; }
        public int? EstimatedAudience { get; set; }
    }
}
