using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZventsApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserController : ControllerBase
    {
        private readonly ZventsDbContext _context;
        private readonly IConfiguration _configuration;  // Adicionamos isso para acessar configurações

        // Construtor que injeta o contexto e as configurações
        public UserController(ZventsDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;  // Atribui a configuração ao campo privado
    }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUserAsync()
        {
            var activeUsers = await _context
                .Users.Where(dbUser =>
                    dbUser.IsDeleted == false && dbUser.UserStatus == UserStatus.Active
                )
                .OrderBy(dbUser => dbUser.CreatedDate)
                .ToListAsync();

            return Ok(activeUsers);
        }

        [HttpGet("activeUsers")]
        public async Task<ActionResult<IEnumerable<object>>> GetActiveUsersAsync()
        {
            var activeUsers = await _context
                .Users
                .Where(dbUser => dbUser.IsDeleted == false && dbUser.UserStatus == UserStatus.Active)
                .Select(dbUser => new {
                    dbUser.Name,
                    dbUser.UserName
                })
                .ToListAsync();

            return Ok(activeUsers);
        }


        [HttpPost]
        public ActionResult<User> PostUser(User user)
        {
            bool userExists = _context.Users.Any(dbUser => dbUser.UserName == user.UserName);

            if (!userExists)
            {
                _context.Users.Add(user);
                _context.SaveChanges();

                return CreatedAtAction("GetUser", new { id = user.Id }, user);
            }

            return Conflict(new { message = "User already exists" });
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginRequest request)
        {
            var user = _context.Users.FirstOrDefault(dbUser =>
                dbUser.UserName == request.Username && dbUser.Password == request.Password
            );

            if (user == null)
            {
                return NotFound(new { message = "Usuário não encontrado" });
            }
            else if (user.UserStatus == UserStatus.Inactive || user.IsDeleted == true) 
            {
                return Unauthorized("Usuário não autorizado");
            }

            // Gerar o token JWT
            var token = GenerateJwtToken(user);

            return Ok(new 
            { 
                token = token, 
                name = user.Name, 
                message = "Login bem-sucedido" 
            });
        }

        // Método para gerar o token JWT
        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("name", user.Name),
                new Claim("role", user.Role.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Classe para encapsular as credenciais do login
        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }


        [HttpGet("name/{name}")]
        public ActionResult<User> GetUserByName(string name)
        {
            var user = _context.Users.FirstOrDefault(dbUser => dbUser.Name == name);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("id/{id}")]
        public ActionResult<User> GetUserById(Guid id)
        {
            var user = _context.Users.FirstOrDefault(dbUser => dbUser.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("userName/{userName}")]
        public ActionResult<User> GetUserByUserName(string userName)
        {
            var user = _context.Users.FirstOrDefault(dbUser => dbUser.UserName == userName);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("{username}&{password}")]
        public ActionResult<User> GetUserByCredentials(string username, string password)
        {
            var user = _context.Users.FirstOrDefault(dbUser =>
                dbUser.UserName == username && dbUser.Password == password
            );

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }
            else if (user.UserStatus == UserStatus.Inactive || user.IsDeleted == true)
            {
                return Unauthorized("User is not authorized");
            }

            return Ok(new { message = "Login successful" });
        }

        [HttpPut("{id}")]
        public IActionResult Edit(Guid id, User updatedUser)
        {
            var userToUpdate = _context.Users.Find(id);

            if (userToUpdate == null)
            {
                return NotFound();
            }

            if (userToUpdate.Role == UserRole.Admin && updatedUser.Role != UserRole.Admin)
            {
                bool isAdminExists = _context.Users.Any(dbUser =>
                    dbUser.Role == UserRole.Admin && dbUser.Id != id
                );

                if (!isAdminExists)
                {
                    return Conflict(
                        new { message = "Cannot change the role of the last admin user" }
                    );
                }
            }

            userToUpdate.Name = updatedUser.Name;
            userToUpdate.Password = updatedUser.Password;
            userToUpdate.UserName = updatedUser.UserName;
            userToUpdate.Role = updatedUser.Role;
            userToUpdate.UserStatus = updatedUser.UserStatus;

            _context.SaveChanges();

            return Ok(userToUpdate);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> SoftDeleteUser(Guid id)
        {
            var userToDelete = await _context.Users.FindAsync(id);

            if (userToDelete == null)
            {
                return NotFound();
            }

            if (userToDelete.Role == UserRole.Admin)
            {
                bool isAdminExists = _context.Users.Any(dbUser =>
                    dbUser.Role == UserRole.Admin && dbUser.Id != id
                );

                if (!isAdminExists)
                {
                    return Conflict(new { message = "Cannot delete the last admin user" });
                }
            }

            userToDelete.IsDeleted = true;
            _context.Entry(userToDelete).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool UserExists(Guid id)
        {
            return _context.Users.Any(user => user.Id == id);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(Guid id)
        {
            var userToDelete = _context.Users.Find(id);

            if (userToDelete == null)
            {
                return NotFound();
            }

            if (userToDelete.Role == UserRole.Admin)
            {
                bool isAdminExists = _context.Users.Any(dbUser =>
                    dbUser.Role == UserRole.Admin && dbUser.Id != id
                );

                if (!isAdminExists)
                {
                    return Conflict(new { message = "Cannot delete the last admin user" });
                }
            }

            _context.Users.Remove(userToDelete);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
