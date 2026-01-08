using Microsoft.EntityFrameworkCore;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Models;

namespace ZventsApi.Infrastructure.Repository
{
    public class ClientRepository(ZventsDbContext context) : IClientRepository
    {
        private readonly ZventsDbContext _context = context;

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
            return await _context.Clients.AnyAsync(c =>
                c.DocumentId == documentId &&
                (!excludeId.HasValue || c.Id != excludeId == false) &&
                (!c.IsDeleted == false || !c.IsDeleted == false)
            );
        }
    }
}
