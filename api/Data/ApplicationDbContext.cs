using Microsoft.EntityFrameworkCore;
using BoatAdminApi.Models;

namespace BoatAdminApi.Data
{
    public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<BoatSale> BoatSales { get; set; }
    public DbSet<BoatPhoto> BoatPhotos { get; set; }
    public DbSet<BoatVideo> BoatVideos { get; set; }
    public DbSet<VehicleCategory> VehicleCategories { get; set; }
    public DbSet<VehicleClass> VehicleClasses { get; set; }
    public DbSet<City> Cities { get; set; }
}

}
