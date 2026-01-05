using Microsoft.EntityFrameworkCore;
using ZventsApi.DTOs.User;
using ZventsApi.Models;
using ZventsApi.Application.Interfaces.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;


namespace ZventsApi.Application.Services
{
    public class UserService : IUserService
    {
        private readonly ZventsDbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(ZventsDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<IEnumerable<UserListDto>> GetAllUsersAsync()
        {
            return await _context.Users
                .OrderBy(u => u.CreatedDate)
                .Select(u => new UserListDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    UserName = u.UserName,
                    CreatedDate = u.CreatedDate
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<UserListDto>> GetActiveUsersAsync()
        {
            return await _context.Users
                .Where(u => u.IsDeleted == false && u.UserStatus == UserStatus.Active)
                .OrderBy(u => u.CreatedDate)
                .Select(u => new UserListDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    UserName = u.UserName,
                    CreatedDate = u.CreatedDate
                })
                .OrderByDescending(u => u.CreatedDate)
                .ToListAsync();
        }

        public async Task<UserListDto?> GetUserByNameAsync(string name)
        {
            return await _context.Users
                .Where(u => u.Name == name && u.IsDeleted == false && u.UserStatus == UserStatus.Active)
                .Select(u => new UserListDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    UserName = u.UserName,
                    CreatedDate = u.CreatedDate
                })
                .FirstOrDefaultAsync();
        }
        public async Task<UserListDto?> GetUserByIdAsync(Guid id)
        {
            return await _context.Users
                .Where(u => u.Id == id && u.IsDeleted == false && u.UserStatus == UserStatus.Active)
                .Select(u => new UserListDto
                {
                    Id = u.Id,
                    Name = u.Name,
                    UserName = u.UserName,
                    CreatedDate = u.CreatedDate
                })
                .FirstOrDefaultAsync();
        }
        public async Task<UserLoginResult?> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.UserName == request.Username && u.Password == request.Password);

            if (user == null || user.UserStatus == UserStatus.Inactive || user.IsDeleted == true)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!);

            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
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
            var userExists = await _context.Users
                .AnyAsync(u => u.UserName == request.UserName);

            if (userExists)
                return null;

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                UserName = request.UserName,
                Password = request.Password,
                Role = request.Role,
                CreatedDate = DateTime.UtcNow,
                UserStatus = UserStatus.Active,
                IsDeleted = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new CreateUserResult
            {
                Id = user.Id,
                Name = user.Name,
                UserName = user.UserName,
                Message = "Usuário criado com sucesso"
            };
        }
    }
}


