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
    public class ClientController(ZventsDbContext context) : ControllerBase
    {
        private readonly ZventsDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClientAsync()
        {
            return await _context.Clients.OrderByDescending(x => x.CreatedDate).ToArrayAsync();
        }

        [HttpPost]
        public ActionResult<Client> PostClient(Client Client)
        {
            bool ClientExists = _context.Clients.Any(q => (q.DocumentId == Client.DocumentId));

            if (!ClientExists)
            {
                _context.Clients.Add(Client);
                _context.SaveChanges();

                return CreatedAtAction(nameof(PostClient), new { id = Client.Id }, Client);
            }

            return Conflict(new { message = "There is already a Client with the same DocumentId" });
        }

        [HttpGet("id/{id}")]
        public ActionResult<Client> GetClientById(Guid id)
        {
            var client = _context.Clients.FirstOrDefault(u => u.Id == id);

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }

        [HttpGet("documentId/{documentId}")]
        public ActionResult<Client> GetClientByDocumentId(string documentId)
        {
            var client = _context.Clients.FirstOrDefault(u => u.DocumentId == documentId);

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAsync(Guid id, Client updatedClient)
        {
            var clientToUpdate = _context.Clients.Find(id);

            if (clientToUpdate == null)
            {
                return NotFound();
            }

            var existingClient = await _context.Clients.FirstOrDefaultAsync(c => c.Id != id && c.DocumentId == updatedClient.DocumentId);

            if (existingClient != null)
            {
                return Conflict("There is already a Client with same DocumentId");
            }

            clientToUpdate.FirstName = updatedClient.FirstName;
            clientToUpdate.LastName = updatedClient.LastName;
            clientToUpdate.DocumentId = updatedClient.DocumentId;
            clientToUpdate.PhoneNumber = updatedClient.PhoneNumber;
            clientToUpdate.Email = updatedClient.Email;
            clientToUpdate.ZipCode = updatedClient.ZipCode;
            clientToUpdate.AddressName = updatedClient.AddressName;
            clientToUpdate.AddressNumber = updatedClient.AddressNumber;
            clientToUpdate.AddressComplement = updatedClient.AddressComplement;
            clientToUpdate.District = updatedClient.District;
            clientToUpdate.State = updatedClient.State;
            clientToUpdate.City = updatedClient.City;
            clientToUpdate.IsActive = updatedClient.IsActive;

            _context.SaveChanges();

            return Ok(clientToUpdate);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteClient(Guid id)
        {

            var clientToDelete = _context.Clients.Find(id);

            if (clientToDelete == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(clientToDelete);
            _context.SaveChanges();

            return NoContent();
        }
    }
}