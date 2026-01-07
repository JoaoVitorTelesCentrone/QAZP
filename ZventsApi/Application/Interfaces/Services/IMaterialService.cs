using ZventsApi.DTOs.Material;
using ZventsApi.Models;

namespace ZventsApi.Application.Interfaces.Services
{
    public interface IMaterialService
    {
        Task<IEnumerable<MaterialResponseDto>> GetAllMaterialsAsync();
        Task<MaterialResponseDto?> GetMaterialByIdAsync(Guid id);
        Task<IEnumerable<MaterialResponseDto>> GetMaterialsByCategoryAsync(MaterialCategory category);
        Task<IEnumerable<MaterialResponseDto>> GetMaterialsByNameAsync(string name);
        Task<MaterialResponseDto> CreateMaterialAsync(MaterialRequestDto dto);
        Task<MaterialResponseDto?> UpdateMaterialAsync(Guid id, MaterialRequestDto dto);
        Task<IEnumerable<MaterialResponseDto>> GetActiveMaterialsAsync();
        Task<bool> SoftDeleteMaterialAsync(Guid id);
        Task<bool> DeleteMaterialAsync(Guid id);
    }
}
