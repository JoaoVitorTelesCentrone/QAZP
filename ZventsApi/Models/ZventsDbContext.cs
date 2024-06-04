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
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=Zvents.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<Event>()
                .HasMany(e => e.Materials)
                .WithMany(m => m.Events)
                .UsingEntity<Dictionary<string, object>>(
                    "MaterialEvent",
                    j => j.HasOne<Material>().WithMany().HasForeignKey("MaterialId"),
                    j => j.HasOne<Event>().WithMany().HasForeignKey("EventId")
                );
        }
    }
}
