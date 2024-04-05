using Microsoft.EntityFrameworkCore;

namespace ZventsApi.Models
{
    public class ZventsDbContext : DbContext
    {
        public ZventsDbContext(DbContextOptions<ZventsDbContext> options) : base(options)
        {
        }
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=Zvents.db");
        }
    }
}
