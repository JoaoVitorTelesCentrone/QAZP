using ZventsApi.Models;

namespace ZventsApi.Application.DTOs
{
    public class ClientDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = default!;
        public string DocumentId { get; set; } = default!;
        public string? Email { get; set; } = default!;
        public string? PhoneNumber { get; set; } = default!;
        public DateTime CreatedDate { get; set; }
    }
}
