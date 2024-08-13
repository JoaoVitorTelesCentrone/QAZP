using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZventsApi.Models;

namespace ZventsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController(ZventsDbContext context) : ControllerBase
    {
        private readonly ZventsDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Material>>> GetMaterialAsync()
        {
            var activeMaterials = await _context
                .Materials.Where(dbMaterial => dbMaterial.IsDeleted == false)
                .OrderBy(dbMaterial => dbMaterial.CreatedDate)
                .ToListAsync();

            return Ok(activeMaterials);
        }

        [HttpGet("id/{id}")]
        public ActionResult<Material> GetMaterialById(Guid id)
        {
            var material = _context.Materials.FirstOrDefault(dbMaterial => dbMaterial.Id == id);

            if (material == null)
            {
                return NotFound();
            }

            return material;
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<Material>>> GetMaterialByCategory(
            MaterialCategory category
        )
        {
            return await _context
                .Materials.Where(dbMaterial => dbMaterial.Category == category)
                .ToArrayAsync();
        }

        [HttpGet("name/{name}")]
        public async Task<ActionResult<IEnumerable<Material>>> GetMaterialByName(string name)
        {
            return await _context
                .Materials.Where(dbMaterial => dbMaterial.Name == name)
                .ToArrayAsync();
        }

        [HttpPost]
        public ActionResult<Material> PostMaterial(Material material)
        {
            bool materialExists = _context.Materials.Any(dbMaterial =>
                dbMaterial.Name == material.Name && dbMaterial.Category == material.Category
            );

            if (!materialExists)
            {
                _context.Materials.Add(material);
                _context.SaveChanges();

                return CreatedAtAction(nameof(PostMaterial), new { id = material.Id }, material);
            }

            return Conflict(
                new { message = "There is already a Material with the same Name and Category" }
            );
        }
    }
}
