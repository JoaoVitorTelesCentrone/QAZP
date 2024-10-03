using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var activeClients = await _context
                .Clients.Where(dbclient => dbclient.IsDeleted == false)
                .OrderBy(dbclient => dbclient.CreatedDate)
                .ToListAsync();

            return Ok(activeClients);
        }

        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<ClientDto>>> GetActiveClientsAsync()
        {
            var activeClients = await _context.Clients
                .Where(dbclient => dbclient.IsDeleted == false)
                .Select(dbclient => new ClientDto
                {
                    FullName = dbclient.FullName,
                    DocumentId = dbclient.DocumentId,
                    Email = dbclient.Email,
                    PhoneNumber = dbclient.PhoneNumber
                })
                .OrderBy(dbclient => dbclient.FullName)
                .ToListAsync();

            return Ok(activeClients);
        }


        [HttpPost]
        public async Task<ActionResult<Client>> PostClientAsync(Client client)
        {
            bool clientExists = await _context.Clients.AnyAsync(dbclient =>
                dbclient.DocumentId == client.DocumentId
            );

            if (!clientExists)
            {
                _context.Clients.Add(client);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetClientById), new { id = client.Id }, client);
            }

            return Conflict(new { message = "There is already a Client with the same DocumentId" });
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<Client>> GetClientById(Guid id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }

        [HttpGet("documentId/{documentId}")]
        public async Task<ActionResult<Client>> GetClientByDocumentId(string documentId)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(dbclient =>
                dbclient.DocumentId == documentId
            );

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAsync(Guid id, Client updatedClient)
        {
            var clientToUpdate = await _context.Clients.FindAsync(id);

            if (clientToUpdate == null)
            {
                return NotFound();
            }

            var existingClient = await _context.Clients.FirstOrDefaultAsync(dbClient =>
                dbClient.Id != id && dbClient.DocumentId == updatedClient.DocumentId
            );

            if (existingClient != null)
            {
                return Conflict("There is already a Client with same DocumentId");
            }

            clientToUpdate.FullName = updatedClient.FullName;
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

            await _context.SaveChangesAsync();

            return Ok(clientToUpdate);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> SoftDeleteClient(Guid id)
        {
            var clientToDelete = await _context.Clients.FindAsync(id);

            if (clientToDelete == null)
            {
                return NotFound();
            }

            clientToDelete.IsDeleted = true;
            _context.Entry(clientToDelete).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
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

        private bool ClientExists(Guid id)
        {
            return _context.Clients.Any(client => client.Id == id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClientAsync(Guid id)
        {
            var clientToDelete = await _context.Clients.FindAsync(id);

            if (clientToDelete == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(clientToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
