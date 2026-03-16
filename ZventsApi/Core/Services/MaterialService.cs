using ZventsApi.Application.Interfaces.Repositories;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.Material;
using ZventsApi.Models;

namespace ZventsApi.Application.Services
{
    public class MaterialService(IMaterialRepository materialRepository) : IMaterialService
    {
        private readonly IMaterialRepository _materialRepository = materialRepository;

        public async Task<IEnumerable<MaterialResponseDto>> GetAllMaterialsAsync()
        {
            var materials = await _materialRepository.GetAllAsync();
            return materials.Select(m => new MaterialResponseDto
            {
                Id = m.Id,
                Name = m.Name,
                Category = m.Category,
                Price = m.Price,
                CreatedDate = m.CreatedDate
            });
        }

        public async Task<IEnumerable<MaterialResponseDto>> GetActiveMaterialsAsync()
        {
            var materials = await _materialRepository.GetAllAsync();
            var activeMaterials = materials
                .Where(m => !m.IsDeleted)
                .Select(m => new MaterialResponseDto
                {
                    Id = m.Id,
                    Name = m.Name,
                    Category = m.Category,
                    Price = m.Price,
                    CreatedDate = m.CreatedDate
                });
            return activeMaterials;
        }

        public async Task<MaterialResponseDto?> GetMaterialByIdAsync(Guid id)
        {
            var material = await _materialRepository.GetByIdAsync(id);
            if (material == null) return null;

            return new MaterialResponseDto
            {
                Id = material.Id,
                Name = material.Name,
                Category = material.Category,
                Price = material.Price,
                CreatedDate = material.CreatedDate
            };
        }

        public async Task<IEnumerable<MaterialResponseDto>> GetMaterialsByCategoryAsync(MaterialCategory category)
        {
            var materials = await _materialRepository.GetByCategoryAsync(category);
            return materials.Select(m => new MaterialResponseDto
            {
                Id = m.Id,
                Name = m.Name,
                Category = m.Category,
                Price = m.Price,
                CreatedDate = m.CreatedDate
            });
        }

        public async Task<IEnumerable<MaterialResponseDto>> GetMaterialsByNameAsync(string name)
        {
            var materials = await _materialRepository.GetByNameAsync(name);
            return materials.Select(m => new MaterialResponseDto
            {
                Id = m.Id,
                Name = m.Name,
                Category = m.Category,
                Price = m.Price,
                CreatedDate = m.CreatedDate
            });
        }

        public async Task<MaterialResponseDto> CreateMaterialAsync(MaterialRequestDto dto)
        {
            var material = new Material
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Category = dto.Category,
                Price = dto.Price,
                CreatedDate = DateTime.UtcNow,
                IsDeleted = false
            };

            await _materialRepository.AddAsync(material);

            return new MaterialResponseDto
            {
                Id = material.Id,
                Name = material.Name,
                Category = material.Category,
                Price = material.Price,
                CreatedDate = material.CreatedDate
            };
        }

        public async Task<MaterialResponseDto?> UpdateMaterialAsync(Guid id, MaterialRequestDto dto)
        {
            var material = await _materialRepository.GetByIdAsync(id);
            if (material == null) return null;

            material.Name = dto.Name;
            material.Category = dto.Category;
            material.Price = dto.Price;

            await _materialRepository.UpdateAsync(material);

            return new MaterialResponseDto
            {
                Id = material.Id,
                Name = material.Name,
                Category = material.Category,
                Price = material.Price,
                CreatedDate = material.CreatedDate
            };
        }

        public async Task<bool> SoftDeleteMaterialAsync(Guid id)
        {
            var material = await _materialRepository.GetByIdAsync(id);
            if (material == null) return false;

            material.IsDeleted = true;
            await _materialRepository.UpdateAsync(material);
            return true;
        }

        public async Task<bool> DeleteMaterialAsync(Guid id)
        {
            var material = await _materialRepository.GetByIdAsync(id);
            if (material == null) return false;

            await _materialRepository.DeleteAsync(material);
            return true;
        }
    }
}
