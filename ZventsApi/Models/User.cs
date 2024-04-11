using System.ComponentModel.DataAnnotations.Schema;

namespace ZventsApi.Models
{
    public enum UserRole
    {
        Admin = 0,
        Vendor = 1
    }
    public class User
    {   
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public UserRole Role {  get; set; }

    }
}
