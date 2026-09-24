using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ZventsApi.Application.Exceptions;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.User;
using ZventsApi.Models;

namespace ZventsApi.Application.Services
{
    public class UserService(
        IUserRepository userRepository,
        IUserSessionRepository sessionRepository,
        IConfiguration configuration) : IUserService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IUserSessionRepository _sessionRepository = sessionRepository;
        private readonly IConfiguration _configuration = configuration;

        // The seeded account everyone falls back to. It can never be deleted, deactivated,
        // renamed or have its password changed, so the platform always has a known way in.
        private const string ProtectedUsername = "admin";

        private static bool IsProtected(User user) => user.Username == ProtectedUsername;

        public async Task<IEnumerable<UserListDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return users.Select(ToListDto);
        }

        public async Task<IEnumerable<UserListDto>> GetActiveUsersAsync()
        {
            var users = await _userRepository.GetActiveUsersAsync();
            return users.Select(ToListDto);
        }

        public async Task<UserListDto?> GetUserByNameAsync(string name)
        {
            var user = await _userRepository.GetByNameAsync(name);
            return user == null ? null : ToListDto(user);
        }

        public async Task<UserListDto?> GetUserByIdAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return user == null ? null : ToListDto(user);
        }

        public async Task<UserListDto?> GetUserByUsernameAsync(string username)
        {
            var user = await _userRepository.GetByUsernameAsync(username);
            return user == null ? null : ToListDto(user);
        }

        private static UserListDto ToListDto(User u) => new()
        {
            Id = u.Id,
            Name = u.Name,
            Username = u.Username,
            CreatedDate = u.CreatedDate
        };

        public async Task<UserLoginResult?> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetByUsernameAsync(request.Username);

            if (user == null || user.UserStatus != UserStatus.Active)
            {
                return null;
            }

            if (!PasswordMatches(user, request.Password))
            {
                return null;
            }

            if (!IsBCryptHash(user.Password))
            {
                // Legacy plaintext password from before hashing was introduced.
                // Migrate it to a proper hash now that we know it's correct.
                user.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
                await _userRepository.UpdateAsync(user);
            }

            return await IssueSessionAsync(user);
        }

        public async Task<UserLoginResult?> RefreshAsync(string refreshToken)
        {
            var currentHash = HashRefreshToken(refreshToken);
            var session = await _sessionRepository.GetByRefreshTokenHashAsync(currentHash);
            if (session == null) return null;

            var user = session.User;
            if (session.ExpiresAt <= DateTime.UtcNow || user.IsDeleted || user.UserStatus != UserStatus.Active)
            {
                await _sessionRepository.DeleteAsync(session);
                return null;
            }

            var newRefreshToken = GenerateRefreshToken();
            var rotated = await _sessionRepository.TryRotateAsync(
                session.Id, currentHash, HashRefreshToken(newRefreshToken), DateTime.UtcNow.AddDays(RefreshTokenDays));
            if (!rotated) return null;

            return BuildLoginResult(user, newRefreshToken);
        }

        public async Task LogoutAsync(string refreshToken)
        {
            var session = await _sessionRepository.GetByRefreshTokenHashAsync(HashRefreshToken(refreshToken));
            if (session != null)
            {
                await _sessionRepository.DeleteAsync(session);
            }
        }

        // Opens a new session (one per browser/device). Each refresh rotates that session's
        // token and pushes its expiration forward, so a session only ends after
        // Jwt:RefreshTokenDays without any activity.
        private async Task<UserLoginResult> IssueSessionAsync(User user)
        {
            await _sessionRepository.DeleteExpiredForUserAsync(user.Id);

            var refreshToken = GenerateRefreshToken();
            await _sessionRepository.AddAsync(new UserSession
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                RefreshTokenHash = HashRefreshToken(refreshToken),
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(RefreshTokenDays)
            });

            return BuildLoginResult(user, refreshToken);
        }

        private int RefreshTokenDays => _configuration.GetValue("Jwt:RefreshTokenDays", 7);

        private UserLoginResult BuildLoginResult(User user, string refreshToken)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!);
            var accessTokenMinutes = _configuration.GetValue("Jwt:AccessTokenMinutes", 60);

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
                Expires = DateTime.UtcNow.AddMinutes(accessTokenMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new UserLoginResult
            {
                Token = tokenHandler.WriteToken(token),
                RefreshToken = refreshToken,
                Name = user.Name,
                Message = "Login bem-sucedido"
            };
        }

        private static string GenerateRefreshToken() =>
            Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

        private static bool IsBCryptHash(string storedPassword) =>
            storedPassword.StartsWith("$2a$")
            || storedPassword.StartsWith("$2b$")
            || storedPassword.StartsWith("$2y$");

        private static bool PasswordMatches(User user, string plainPassword) =>
            IsBCryptHash(user.Password)
                ? BCrypt.Net.BCrypt.Verify(plainPassword, user.Password)
                : user.Password == plainPassword;

        private static string HashRefreshToken(string refreshToken) =>
            Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(refreshToken)));

        public async Task<CreateUserResult?> CreateUserAsync(CreateUserRequest request)
        {
            var exists = await _userRepository.ExistsByUsernameAsync(request.Username);
            if (exists) return null;

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Username = request.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
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

            if (IsProtected(user))
            {
                if (user.Username != updatedUser.Username)
                    throw new BusinessRuleException("O usuário admin não pode ser renomeado");
                if (updatedUser.UserStatus != UserStatus.Active)
                    throw new BusinessRuleException("O usuário admin não pode ser desativado");
                if (!PasswordMatches(user, updatedUser.Password))
                    throw new BusinessRuleException("A senha do usuário admin não pode ser alterada");
            }

            if (user.Username != updatedUser.Username
                && await _userRepository.ExistsByUsernameAsync(updatedUser.Username))
            {
                throw new BusinessRuleException("Nome de usuário já existe");
            }

            user.Name = updatedUser.Name;
            user.Username = updatedUser.Username;

            var passwordChanged = !PasswordMatches(user, updatedUser.Password);
            if (passwordChanged)
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);
            }
            user.Role = updatedUser.Role;
            user.UserStatus = updatedUser.UserStatus;

            await _userRepository.UpdateAsync(user);

            if (passwordChanged)
            {
                // A new password must end every session opened with the old one.
                await _sessionRepository.DeleteAllForUserAsync(user.Id);
            }

            return ToListDto(user);
        }

        public async Task<bool> SoftDeleteUserAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return false;

            if (IsProtected(user))
                throw new BusinessRuleException("O usuário admin não pode ser excluído");

            user.IsDeleted = true;
            await _userRepository.UpdateAsync(user);
            return true;
        }

        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return false;

            if (IsProtected(user))
                throw new BusinessRuleException("O usuário admin não pode ser excluído");

            await _userRepository.DeleteAsync(user);
            return true;
        }
    }
}
