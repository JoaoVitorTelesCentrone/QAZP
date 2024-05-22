using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ZventsApi.Models
{
    public class EventMaterial
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required(ErrorMessage = "EventId is required")]
        public Guid EventId { get; set; }
        public Event? Event { get; set; }
        [Required(ErrorMessage = "MaterialId is required")]
        public Guid MaterialId { get; set; }
        public Material? Material { get; set; }
        [Required(ErrorMessage = "Quantity is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be bigger than 0")]
        public int Quantity { get; set; }
        public DateTime CreatedDate { get; set; }

        public EventMaterial()
        {
            CreatedDate = DateTime.Now;
        }
    }
}
