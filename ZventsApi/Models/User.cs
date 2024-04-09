using System.ComponentModel.DataAnnotations.Schema;

namespace ZventsApi.Models
{
    public class User
    {   
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        [Index(IsUnique = true)]
        public string UserName { get; set; }
        public string Role {  get; set; }

    }
}
