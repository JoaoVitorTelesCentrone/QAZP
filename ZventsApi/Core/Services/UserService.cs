using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.User;
using ZventsApi.Models;

namespace ZventsApi.Application.Services
{
    public class UserService(IUserRepository userRepository, IConfiguration configuration) : IUserService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IConfiguration _configuration = configuration;

        public async Task<IEnumerable<UserListDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return users.Select(u => new UserListDto
            {
                Id = u.Id,
                Name = u.Name,
                Username = u.Username,
                CreatedDate = u.CreatedDate
            });
        }

        public async Task<IEnumerable<UserListDto>> GetActiveUsersAsync()
        {
            var users = await _userRepository.GetActiveUsersAsync();
            return users.Select(u => new UserListDto
            {
                Id = u.Id,
                Name = u.Name,
                Username = u.Username,
                CreatedDate = u.CreatedDate
            });
        }

        public async Task<UserListDto?> GetUserByNameAsync(string name)
        {
            var user = await _userRepository.GetByNameAsync(name);
            if (user == null) return null;

            return new UserListDto
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                CreatedDate = user.CreatedDate
            };
        }

        public async Task<UserListDto?> GetUserByIdAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return null;

            return new UserListDto
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                CreatedDate = user.CreatedDate
            };
        }

        public async Task<UserListDto?> GetUserByUsernameAsync(string username)
        {
            var user = await _userRepository.GetByUsernameAsync(username);
            if (user == null) return null;

            return new UserListDto
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                CreatedDate = user.CreatedDate
            };
        }

        public async Task<UserLoginResult?> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetByUsernameAsync(request.Username);

            if (user == null 
            || user.Password != request.Password 
            || user.UserStatus != UserStatus.Active)
            {
                return null;
            }
                
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("name", user.Name),
                new Claim("role", user.Role.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new UserLoginResult
            {
                Token = tokenHandler.WriteToken(token),
                Name = user.Name,
                Message = "Login bem-sucedido"
            };
        }

        public async Task<CreateUserResult?> CreateUserAsync(CreateUserRequest request)
        {
            var exists = await _userRepository.ExistsByUsernameAsync(request.Username);
            if (exists) return null;

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Username = request.Username,
                Password = request.Password,
                Role = request.Role,
                CreatedDate = DateTime.UtcNow,
                UserStatus = UserStatus.Active,
                IsDeleted = false
            };

            await _userRepository.AddAsync(user);

            return new CreateUserResult
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                Message = "Usuário criado com sucesso"
            };
        }

        public async Task<UserListDto?> UpdateUserAsync(Guid id, UpdateUserRequestDto updatedUser)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return null;

            if (user.Role == UserRole.Admin && updatedUser.Role != UserRole.Admin)
            {
                var admins = await _userRepository.GetUsersByRoleAsync(UserRole.Admin);
                if (admins.Count() <= 1)
                    throw new InvalidOperationException("Cannot change the role of the last admin user");
            }

            user.Name = updatedUser.Name;
            user.Username = updatedUser.Username;
            user.Password = updatedUser.Password;
            user.Role = updatedUser.Role;
            user.UserStatus = updatedUser.UserStatus;

            await _userRepository.UpdateAsync(user);

            return new UserListDto
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                CreatedDate = user.CreatedDate
            };
        }

        public async Task<bool> SoftDeleteUserAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return false;

            if (user.Role == UserRole.Admin)
            {
                var admins = await _userRepository.GetUsersByRoleAsync(UserRole.Admin);
                if (admins.Count() <= 1)
                    throw new InvalidOperationException("Cannot delete the last admin user");
            }

            user.IsDeleted = true;
            await _userRepository.UpdateAsync(user);
            return true;
        }

        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return false;

            if (user.Role == UserRole.Admin)
            {
                var admins = await _userRepository.GetUsersByRoleAsync(UserRole.Admin);
                if (admins.Count() <= 1)
                    throw new InvalidOperationException("Cannot delete the last admin user");
            }

            await _userRepository.DeleteAsync(user);
            return true;
        }
    }
}
