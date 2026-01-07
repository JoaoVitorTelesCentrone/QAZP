using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Repository
{
    public interface IClientRepository
    {
        Task<IEnumerable<Client>> GetAllClientsAsync();
        Task<IEnumerable<Client>> GetActiveClientsAsync();
        Task<Client?> GetClientByIdAsync(Guid id);
        Task CreateClientAsync(Client client);
        Task UpdateClientAsync(Client client);
        Task DeleteClientAsync(Client client);
        Task<bool> ClientWithDocumentExistsAsync(string documentId, Guid? excludeId = null);
    }
}
