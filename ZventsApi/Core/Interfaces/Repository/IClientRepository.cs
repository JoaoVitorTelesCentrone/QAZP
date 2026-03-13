using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Repositories
{
    public interface IClientRepository
    {
        Task<IReadOnlyCollection<Client>> GetAllClientsAsync();
        Task<IReadOnlyCollection<Client>> GetActiveClientsAsync();
        Task<Client?> GetClientByIdAsync(Guid id);
        Task CreateClientAsync(Client client);
        Task UpdateClientAsync(Client client);
        Task DeleteClientAsync(Client client);
        Task<bool> ClientWithDocumentExistsAsync(string documentId, Guid? excludeId = null);
    }
}
