using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Models;

namespace ZventsApi.Infrastructure.Repository
{
    public class ClientRepository(ZventsDbContext context, ILogger<ClientRepository> logger) : IClientRepository
    {
        private readonly ZventsDbContext _context = context;
        private readonly ILogger<ClientRepository> _logger = logger;

        public async Task<IReadOnlyCollection<Client>> GetAllClientsAsync()
        {
            return await _context.Clients
                .ToListAsync();
        }

        public async Task<IReadOnlyCollection<Client>> GetActiveClientsAsync()
        {
            return await _context.Clients
                .Where(c => !c.IsDeleted)
                .ToListAsync();
        }

        // Soft-deleted clients are hidden unless the caller explicitly needs them (hard delete).
        public async Task<Client?> GetClientByIdAsync(Guid id, bool includeDeleted = false)
        {
            _logger.LogDebug("Lógica para o cliente ({id})", id);
            return await _context.Clients.FirstOrDefaultAsync(c => c.Id == id && (includeDeleted || !c.IsDeleted));
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

        // Counts soft-deleted events too: they still reference the client in the database.
        public async Task<bool> HasEventsAsync(Guid clientId)
        {
            return await _context.Events.AnyAsync(e => e.ClientId == clientId);
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
