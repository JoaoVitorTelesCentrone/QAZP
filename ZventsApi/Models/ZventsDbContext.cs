using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace ZventsApi.Models
{
    public class ZventsDbContext(DbContextOptions<ZventsDbContext> options) : DbContext(options)
    {
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventMaterial> EventMaterials { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=Zvents.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EventMaterial>()
                .HasKey(em => new { em.EventId, em.MaterialId });

            modelBuilder.Entity<EventMaterial>()
                .HasOne(em => em.Event)
                .WithMany(e => e.EventMaterials)
                .HasForeignKey(em => em.EventId);

            modelBuilder.Entity<EventMaterial>()
                .HasOne(em => em.Material)
                .WithMany(m => m.EventMaterials)
                .HasForeignKey(em => em.MaterialId);
        }
    }
}
