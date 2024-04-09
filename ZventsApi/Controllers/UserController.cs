using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(ZventsDbContext context) : ControllerBase
    {
        private readonly ZventsDbContext _context = context;

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUser()
        {
            return _context.Users.ToList();
        }

        [HttpPost]
        public ActionResult<User> PostUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("{username}&{password}")]
        public ActionResult<User> GetUserByCredentials(string username, string password)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserName == username && u.Password == password);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(new { message = "Login successful"});
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.Name = user.Name;
            existingUser.Password = user.Password;
            existingUser.UserName = user.UserName;
            existingUser.Role = user.Role;
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
            return _context.Users.Any(e => e.Id == id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}