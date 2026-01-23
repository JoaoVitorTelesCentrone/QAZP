using Microsoft.AspNetCore.Mvc;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.Models;
using ZventsApi.Application.DTOs;


namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController(IClientService clientService) : ControllerBase
    {
        private readonly IClientService _clientService = clientService;

        /// <summary>
        /// Retrieves a list with all Clients
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetAllClientsAsync()
        {
            var clients = await _clientService.GetAllClientsAsync();
            return Ok(clients);
        }
        /// <summary>
        /// Retrieves a list with all active clients
        /// </summary>
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<ClientDto>>> GetActiveClientsAsync()
        {
            var activeClients = await _clientService.GetActiveClientsAsync();
            return Ok(activeClients);
        }

        [HttpGet("id/{id}", Name = "GetClientById")]
        public async Task<ActionResult<Client>> GetClientByIdAsync(Guid id)
        {
            var client = await _clientService.GetClientByIdAsync(id);

            if (client == null)
                return NotFound();

            return Ok(client);
        }

        [HttpPost]
        public async Task<ActionResult<Client>> CreateClientAsync([FromBody] Client client)
        {
            var createdClient = await _clientService.CreateClientAsync(client);

            if (createdClient == null)
                return Conflict(new { message = "Client already exists" });

            return CreatedAtAction(
                "GetClientById",
                new { id = createdClient.Id },
                createdClient
            );
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Client>> EditClientAsync(Guid id, Client updatedClient)
        {
            var client = await _clientService.EditClientAsync(id, updatedClient);

            if (client == null)
                return NotFound();

            return Ok(client);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> SoftDeleteClientAsync(Guid id)
        {
            var success = await _clientService.SoftDeleteClientAsync(id);

            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClientAsync(Guid id)
        {
            var success = await _clientService.DeleteClientAsync(id);

            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
