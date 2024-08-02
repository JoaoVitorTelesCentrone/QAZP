using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ZventsApi.Models
{
    public enum UserRole
    {
        Admin,
        Vendor,
    }

    public enum UserStatus
    {
        Active,
        Inactive,
    }

    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "User name is required")]
        public string UserName { get; set; }
        public UserRole? Role { get; set; }
        public DateTime CreatedDate { get; set; }
        public UserStatus UserStatus { get; set; }
        public bool? IsDeleted { get; set; }

        public User()
        {
            CreatedDate = DateTime.Now;
            IsDeleted = false;
            UserStatus = UserStatus.Active;
        }
    }
}
