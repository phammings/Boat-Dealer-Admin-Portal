using Microsoft.EntityFrameworkCore;
using BoatAdminApi.Models;

namespace BoatAdminApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Boat> Boats { get; set; }
    }
}
