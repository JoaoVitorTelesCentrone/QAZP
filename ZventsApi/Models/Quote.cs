namespace ZventsApi.Models
{
    public class Quote
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string EventType { get; set; }
        public int EstimatedAudience { get; set; }
    }
}
