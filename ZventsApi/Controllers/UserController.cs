using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZventsApi.Models;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.User;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Reflection.Metadata;


namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly ZventsDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public UserController(
            ZventsDbContext context,
            IConfiguration configuration,
            IUserService userService)
        {
            _context = context;
            _configuration = configuration;
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserListDto>>> GetAllUsersAsync()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("activeUsers")]
        public async Task<ActionResult<IEnumerable<UserListDto>>> GetActiveUsersAsync()
        {
            var activeUsers = await _userService.GetActiveUsersAsync();
            return Ok(activeUsers);
        }


        [HttpPost]
        public async Task<ActionResult<CreateUserResult>> PostUser(
            [FromBody] CreateUserRequest request)
        {
            var result = await _userService.CreateUserAsync(request);

            if (result == null)
                return Conflict(new { message = "User already exists" });

            return CreatedAtAction(
                "GetUserById",
                new { id = result.Id },
                result
            );
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserLoginResult>> Login([FromBody] LoginRequest request)
        {
            var result = await _userService.LoginAsync(request);

            if (result == null)
                return Unauthorized(new { message = "Usuário não encontrado ou não autorizado" });

            return Ok(result);
        }


        [HttpGet("name/{name}")]
        public async Task<ActionResult<UserListDto>> GetUserByNameAsync(string name)
        {
            var user = await _userService.GetUserByNameAsync(name);

            if (user == null)
                return NotFound();

            return Ok(user);
        }


        [HttpGet("id/{id}", Name = "GetUserById")]
        public async Task<ActionResult<UserListDto>> GetUserByIdAsync(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
                return NotFound();

            return Ok(user);
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
