using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
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
            bool userExists = _context.Users.Any(u => u.UserName == user.UserName);

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
            var user = _context.Users.FirstOrDefault(u => u.Name == name);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("userName/{userName}")]
        public ActionResult<User> GetUserByUserName(string userName)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserName == userName);

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
        public IActionResult Edit(Guid id, User updatedUser)
        {
            var userToUpdate = _context.Users.Find(id);

            if (userToUpdate == null)
            {
                return NotFound();
            }

            if (userToUpdate.Role == UserRole.Admin && updatedUser.Role != UserRole.Admin)
            {
                bool isAdminExists = _context.Users.Any(u => u.Role == UserRole.Admin && u.Id != id);

                if (!isAdminExists)
                {
                    return Conflict(new { message = "Cannot change the role of the last admin user" });
                }
            }

            userToUpdate.Name = updatedUser.Name;
            userToUpdate.Password = updatedUser.Password;
            userToUpdate.UserName = updatedUser.UserName;
            userToUpdate.Role = updatedUser.Role;

            _context.SaveChanges();

            return Ok(userToUpdate);
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
                bool isAdminExists = _context.Users.Any(u => u.Role == UserRole.Admin && u.Id != id);

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