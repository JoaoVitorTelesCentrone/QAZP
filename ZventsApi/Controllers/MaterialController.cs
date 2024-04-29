using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
            return await _context.Materials.OrderByDescending(x => x.CreatedDate).ToArrayAsync();
        }

        [HttpGet("id/{id}")]
        public ActionResult<Material> GetMaterialById(Guid id)
        {
            var material = _context.Materials.FirstOrDefault(m => m.Id == id);

            if (material == null)
            {
                return NotFound();
            }

            return material;
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<Material>>> GetMaterialByCategory(MaterialCategory category)
        {
            return await _context.Materials.Where(x => x.Category == category).ToArrayAsync();

        }

        [HttpPost]
        public ActionResult<Material> PostMaterial(Material material)
        {
            bool materialExists = _context.Materials.Any(q => (q.Name == material.Name && q.Category == material.Category));

            if (!materialExists)
            {
                _context.Materials.Add(material);
                _context.SaveChanges();

                return CreatedAtAction(nameof(PostMaterial), new { id = material.Id }, material);
            }

            return Conflict(new { message = "There is already a Material with the same Name and Category" });
        }
    }
}