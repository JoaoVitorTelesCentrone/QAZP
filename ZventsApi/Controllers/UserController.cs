using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(ZventsDbContext context) : ControllerBase
    {
        private readonly ZventsDbContext _context = context;

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
