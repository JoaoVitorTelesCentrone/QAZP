using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;

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
    }
}
