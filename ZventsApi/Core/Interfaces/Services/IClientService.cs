using ZventsApi.Models;
using ZventsApi.Application.DTOs;

namespace ZventsApi.Application.Interfaces.Services
{
    public interface IClientService
    {
        Task<IEnumerable<ClientDto>> GetAllClientsAsync();
        Task<IEnumerable<ClientDto>> GetActiveClientsAsync();
        Task<Client?> GetClientByIdAsync(Guid id);
        Task<Client?> CreateClientAsync(Client client);
        Task<Client?> EditClientAsync(Guid id, Client client);
        Task<bool> SoftDeleteClientAsync(Guid id);
        Task<bool> DeleteClientAsync(Guid id);
    }
}
