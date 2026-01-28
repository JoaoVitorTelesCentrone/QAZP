using Microsoft.AspNetCore.Mvc;
using ZventsApi.Application.Interfaces.Services;
using ZventsApi.DTOs.Material;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/material")]
    [ApiController]
    public class MaterialController(IMaterialService materialService) : ControllerBase
    {
        private readonly IMaterialService _materialService = materialService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaterialResponseDto>>> GetAllMaterials()
        {
            var materials = await _materialService.GetAllMaterialsAsync();
            return Ok(materials);
        }

        [HttpGet("active-materials")]
        public async Task<ActionResult<IEnumerable<MaterialResponseDto>>> GetActiveMaterialsAsync()
        {
            var activeMaterials = await _materialService.GetActiveMaterialsAsync();
            return Ok(activeMaterials);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<MaterialResponseDto>> GetMaterialById(Guid id)
        {
            var material = await _materialService.GetMaterialByIdAsync(id);
            if (material == null) return NotFound();
            return Ok(material);
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<MaterialResponseDto>>> GetMaterialsByCategory(MaterialCategory category)
        {
            var materials = await _materialService.GetMaterialsByCategoryAsync(category);
            return Ok(materials);
        }

        [HttpGet("name/{name}")]
        public async Task<ActionResult<IEnumerable<MaterialResponseDto>>> GetMaterialsByName(string name)
        {
            var materials = await _materialService.GetMaterialsByNameAsync(name);
            return Ok(materials);
        }

        [HttpPost]
        public async Task<ActionResult<MaterialResponseDto>> CreateMaterial(MaterialRequestDto dto)
        {
            var material = await _materialService.CreateMaterialAsync(dto);
            return CreatedAtAction(nameof(GetMaterialById), new { id = material.Id }, material);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> SoftDeleteMaterial(Guid id)
        {
            var success = await _materialService.SoftDeleteMaterialAsync(id);

            if (!success)
                return NotFound();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(Guid id)
        {
            var success = await _materialService.DeleteMaterialAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
