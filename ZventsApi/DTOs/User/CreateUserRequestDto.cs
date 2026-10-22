using System.ComponentModel.DataAnnotations;
using ZventsApi.Models;

namespace ZventsApi.DTOs.User
{
    public class CreateUserRequest
    {
        [Required(ErrorMessage = "O nome é obrigatório"), StringLength(200, ErrorMessage = "O nome deve ter no máximo 200 caracteres")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "O usuário é obrigatório"), StringLength(100, ErrorMessage = "O usuário deve ter no máximo 100 caracteres")]
        public string Username { get; set; } = null!;

        [Required(ErrorMessage = "A senha é obrigatória"), MinLength(6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres")]
        public string Password { get; set; } = null!;

        public UserRole Role { get; set; }
    }
}
