using System.ComponentModel.DataAnnotations;
using ZventsApi.Models;

namespace ZventsApi.DTOs.Material
{
    public class MaterialRequestDto
    {
        [Required, StringLength(200)]
        public string Name { get; set; } = null!;

        public MaterialCategory Category { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Price must be zero or greater")]
        public decimal Price { get; set; }
    }
}
