using ZventsApi.Models;
using ZventsApi.Application.DTOs;
using ZventsApi.DTOs.Client;

namespace ZventsApi.Application.Interfaces.Services
{
    public interface IClientService
    {
        Task<IEnumerable<ClientDto>> GetAllClientsAsync();
        Task<IEnumerable<ClientDto>> GetActiveClientsAsync();
        Task<Client?> GetClientByIdAsync(Guid id);
        Task<Client?> CreateClientAsync(ClientRequestDto request);
        Task<Client?> EditClientAsync(Guid id, ClientRequestDto request);
        Task<bool> SoftDeleteClientAsync(Guid id);
        Task<bool> DeleteClientAsync(Guid id);
    }
}
