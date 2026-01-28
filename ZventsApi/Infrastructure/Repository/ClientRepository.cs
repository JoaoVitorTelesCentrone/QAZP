using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Models;

namespace ZventsApi.Infrastructure.Repository
{
    public class ClientRepository(ZventsDbContext context, ILogger<ClientRepository> logger) : IClientRepository
    {
        private readonly ZventsDbContext _context = context;
        private readonly ILogger<ClientRepository> _logger = logger;

        public async Task<IEnumerable<Client>> GetAllClientsAsync()
        {
            return await _context.Clients
                .Where(c => !c.IsDeleted)
                .ToListAsync();
        }

        public async Task<IEnumerable<Client>> GetActiveClientsAsync()
        {
            return await _context.Clients
                .Where(c => !c.IsDeleted)
                .ToListAsync();
        }

        public async Task<Client?> GetClientByIdAsync(Guid id)
        {
            _logger.LogDebug("Lógica para o cliente ({id})", id);
            return await _context.Clients.FindAsync(id);
        }

        public async Task CreateClientAsync(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateClientAsync(Client client)
        {
            _context.Entry(client).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteClientAsync(Client client)
        {
            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ClientWithDocumentExistsAsync(string documentId, Guid? excludeId = null)
        {
            var query = _context.Clients
                .Where(c => c.DocumentId == documentId && !c.IsDeleted);

            if (excludeId.HasValue)
            {
                query = query.Where(c => c.Id != excludeId.Value);
            }


            return await query.AnyAsync();
        }
    }
}
