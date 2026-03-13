using ZventsApi.Models;

namespace ZventsApi.DTOs.EventMaterial
{
    public class EventMaterialResponseDto
    {
        public Guid MaterialId { get; set; }
        public string MaterialName { get; set; } = default!;
        public decimal MaterialPrice { get; set; }
        public int Quantity { get; set; }
    }
}
