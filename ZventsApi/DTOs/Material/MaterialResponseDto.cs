using ZventsApi.Models;

namespace ZventsApi.DTOs.Material
{
    public class MaterialResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public MaterialCategory Category { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
