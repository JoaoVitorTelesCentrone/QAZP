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
        public DbSet<UserSession> UserSessions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Uniqueness is also checked in the services, but only the database can stop two
            // concurrent requests from both passing that check. Soft-deleted rows don't count,
            // so a removed username/document can be registered again.
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique()
                .HasFilter("\"IsDeleted\" = 0");

            modelBuilder.Entity<Client>()
                .HasIndex(c => c.DocumentId)
                .IsUnique()
                .HasFilter("\"IsDeleted\" = 0");

            // Hard-deleting a client or material must not silently take events with it.
            modelBuilder.Entity<Event>()
                .HasOne(e => e.Client)
                .WithMany()
                .HasForeignKey(e => e.ClientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserSession>()
                .HasIndex(s => s.RefreshTokenHash)
                .IsUnique();

            modelBuilder.Entity<UserSession>()
                .HasIndex(s => s.PreviousRefreshTokenHash);

            modelBuilder.Entity<UserSession>()
                .HasOne(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<EventMaterial>()
                .HasKey(em => new { em.EventId, em.MaterialId });

            modelBuilder.Entity<EventMaterial>()
                .HasOne(em => em.Event)
                .WithMany(e => e.EventMaterials)
                .HasForeignKey(em => em.EventId);

            modelBuilder.Entity<EventMaterial>()
                .HasOne(em => em.Material)
                .WithMany(m => m.EventMaterials)
                .HasForeignKey(em => em.MaterialId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
