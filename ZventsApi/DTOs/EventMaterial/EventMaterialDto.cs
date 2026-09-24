using System.ComponentModel.DataAnnotations;

namespace ZventsApi.DTOs.Event
{
    public class EventMaterialDto
    {
        [Required]
        public Guid MaterialId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than zero")]
        public int Quantity { get; set; }
    }
}
