using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace ZventsApi.Models
{
    public enum MaterialCategory
    {
        Food,
        Decoration,
        Utensils,
        Furniture,
        HumanResources,
        RealEstate,
        Entertainment,
        Marketing
    }

    public class Material
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Category is required")]
        public MaterialCategory Category { get; set; }
        [Required(ErrorMessage = "Value is required")]
        public decimal Value { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool? IsActive { get; set; }

        public Material()
        {
            IsActive = true;
            CreatedDate = DateTime.Now;
        }
    }
}
