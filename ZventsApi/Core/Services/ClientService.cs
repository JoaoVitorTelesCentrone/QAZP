using ZventsApi.Application.Interfaces.Services;
using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Models;
using ZventsApi.Application.DTOs;
using ZventsApi.DTOs.Client;

namespace ZventsApi.Application.Services
{
    public class ClientService(IClientRepository repository) : IClientService
    {
        private readonly IClientRepository _repository = repository;

        public async Task<IEnumerable<ClientDto>> GetAllClientsAsync()
        {
            var clients = await _repository.GetAllClientsAsync();
            return clients.Select(ToDto);
        }

        public async Task<IEnumerable<ClientDto>> GetActiveClientsAsync()
        {
            var clients = await _repository.GetActiveClientsAsync();
            return clients
                .OrderByDescending(c => c.CreatedDate)
                .Select(ToDto);
        }

        public async Task<Client?> GetClientByIdAsync(Guid id)
        {
            return await _repository.GetClientByIdAsync(id);
        }

        public async Task<Client?> CreateClientAsync(ClientRequestDto request)
        {
            if (await _repository.ClientWithDocumentExistsAsync(request.DocumentId))
                return null;

            var client = new Client
            {
                Id = Guid.NewGuid(),
                FullName = request.FullName,
                DocumentId = request.DocumentId,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                ZipCode = request.ZipCode,
                AddressName = request.AddressName,
                AddressNumber = request.AddressNumber,
                AddressComplement = request.AddressComplement,
                District = request.District,
                State = request.State,
                City = request.City,
                CreatedDate = DateTime.UtcNow,
                IsDeleted = false
            };

            await _repository.CreateClientAsync(client);
            return client;
        }

        public async Task<Client?> EditClientAsync(Guid id, ClientRequestDto request)
        {
            var client = await _repository.GetClientByIdAsync(id);
            if (client == null) return null;

            if (await _repository.ClientWithDocumentExistsAsync(request.DocumentId, id))
                return null;

            client.FullName = request.FullName;
            client.DocumentId = request.DocumentId;
            client.PhoneNumber = request.PhoneNumber;
            client.Email = request.Email;
            client.ZipCode = request.ZipCode;
            client.AddressName = request.AddressName;
            client.AddressNumber = request.AddressNumber;
            client.AddressComplement = request.AddressComplement;
            client.District = request.District;
            client.State = request.State;
            client.City = request.City;

            await _repository.UpdateClientAsync(client);
            return client;
        }

        private static ClientDto ToDto(Client c) => new()
        {
            Id = c.Id,
            FullName = c.FullName,
            DocumentId = c.DocumentId,
            Email = c.Email,
            PhoneNumber = c.PhoneNumber,
            CreatedDate = c.CreatedDate
        };

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
