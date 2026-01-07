using ZventsApi.Models;

namespace ZventsApi.DTOs.Material
{
    public class MaterialRequestDto
    {
        public string Name { get; set; } = null!;
        public MaterialCategory Category { get; set; }
        public decimal Price { get; set; }
    }
}
