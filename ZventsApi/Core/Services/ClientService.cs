using ZventsApi.Application.Interfaces.Services;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Models;
using ZventsApi.Application.DTOs;

namespace ZventsApi.Application.Services
{
    public class ClientService(IClientRepository repository) : IClientService
    {
        private readonly IClientRepository _repository = repository;

        public async Task<IEnumerable<Client>> GetAllClientsAsync()
        {
            return await _repository.GetAllClientsAsync();
        }

        public async Task<IEnumerable<ClientDto>> GetActiveClientsAsync()
        //IList avaliar
        {
            var clients = await _repository.GetActiveClientsAsync();

            return clients
                .OrderByDescending(c => c.CreatedDate)
                .Select(c => new ClientDto
                {
                    Id = c.Id,
                    FullName = c.FullName,
                    DocumentId = c.DocumentId,
                    Email = c.Email ?? string.Empty,
                    PhoneNumber = c.PhoneNumber ?? string.Empty,
                    CreatedDate = c.CreatedDate
                });
            //mapper
        }

        public async Task<Client?> GetClientByIdAsync(Guid id)
        {
            return await _repository.GetClientByIdAsync(id);
        }

        public async Task<Client?> CreateClientAsync(Client client)
        {
            if (await _repository.ClientWithDocumentExistsAsync(client.DocumentId))
                return null;

            await _repository.CreateClientAsync(client);
            return client;
        }

        public async Task<Client?> EditClientAsync(Guid id, Client updatedClient)
        {
            var client = await _repository.GetClientByIdAsync(id);
            if (client == null) return null;

            if (await _repository.ClientWithDocumentExistsAsync(updatedClient.DocumentId, id))
                return null;

            client.FullName = updatedClient.FullName;
            client.DocumentId = updatedClient.DocumentId;
            client.PhoneNumber = updatedClient.PhoneNumber;
            client.Email = updatedClient.Email;
            client.ZipCode = updatedClient.ZipCode;
            client.AddressName = updatedClient.AddressName;
            client.AddressNumber = updatedClient.AddressNumber;
            client.AddressComplement = updatedClient.AddressComplement;
            client.District = updatedClient.District;
            client.State = updatedClient.State;
            client.City = updatedClient.City;

            await _repository.UpdateClientAsync(client);
            return client;
        }

        public async Task<bool> SoftDeleteClientAsync(Guid id)
        {
            var client = await _repository.GetClientByIdAsync(id);
            if (client == null) return false;

            client.IsDeleted = true;
            await _repository.UpdateClientAsync(client);
            return true;
        }

        public async Task<bool> DeleteClientAsync(Guid id)
        {
            var client = await _repository.GetClientByIdAsync(id);
            if (client == null) return false;

            await _repository.DeleteClientAsync(client);
            return true;
        }
    }
}
