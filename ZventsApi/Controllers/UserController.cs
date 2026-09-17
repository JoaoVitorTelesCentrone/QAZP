using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.User;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/user")]
    [ApiController]
    [Authorize]
    public class UserController(IUserService userService, ILogger<UserController> logger) : ControllerBase
    {
        private readonly IUserService _userService = userService;
        private readonly ILogger<UserController> _logger = logger;

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

        [HttpGet("username/{username}")]
        public async Task<ActionResult<UserListDto>> GetUserByUsernameAsync(string username)
        {
            var user = await _userService.GetUserByUsernameAsync(username);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<CreateUserResult>> PostUser([FromBody] CreateUserRequest request)
        {
            var result = await _userService.CreateUserAsync(request);

            if (result == null)
            {
                _logger.LogWarning("Tentativa de criar usuário já existente: {Username}", request.Username);
                return Conflict(new { message = "User already exists" });
            }

            _logger.LogInformation("Usuário criado: {UserId}", result.Id);
            return CreatedAtAction(
                "GetUserById",
                new { id = result.Id },
                result
            );
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<UserLoginResult>> Login([FromBody] LoginRequest request)
        {
            var result = await _userService.LoginAsync(request);

            if (result == null)
            {
                _logger.LogWarning("Tentativa de login falhou para o usuário: {Username}", request.Username);
                return Unauthorized(new { message = "Usuário não encontrado ou não autorizado" });
            }

            _logger.LogInformation("Login bem-sucedido para o usuário: {Username}", request.Username);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserListDto>> Edit(Guid id, UpdateUserRequestDto updatedUser)
        {
            var user = await _userService.UpdateUserAsync(id, updatedUser);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> SoftDeleteUser(Guid id)
        {
            var success = await _userService.SoftDeleteUserAsync(id);

            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var success = await _userService.DeleteUserAsync(id);

            if (!success)
                return NotFound();

            _logger.LogInformation("Usuário excluído: {UserId}", id);
            return NoContent();
        }
    }
}