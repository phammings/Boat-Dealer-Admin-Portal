using Microsoft.EntityFrameworkCore;
using BoatAdminApi.Models;

namespace BoatAdminApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<BoatSale> BoatSales { get; set; }
        public DbSet<BoatPhoto> BoatPhotos { get; set; }
        public DbSet<BoatVideo> BoatVideos { get; set; }
        public DbSet<VehicleCategory> VehicleCategories { get; set; }
        public DbSet<VehicleClass> VehicleClasses { get; set; }
        public DbSet<City> Cities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Table names
            modelBuilder.Entity<BoatSale>().ToTable("BoatSale");
            modelBuilder.Entity<BoatPhoto>().ToTable("BoatPhoto");
            modelBuilder.Entity<BoatVideo>().ToTable("BoatVideo");
            modelBuilder.Entity<VehicleCategory>().ToTable("VehicleCategory");
            modelBuilder.Entity<VehicleClass>().ToTable("VehicleClass");
            modelBuilder.Entity<City>().ToTable("City");

            // Primary keys
            modelBuilder.Entity<BoatSale>().HasKey(bs => bs.BoatID);
            modelBuilder.Entity<City>().HasKey(c => c.CityID);
            modelBuilder.Entity<VehicleClass>().HasKey(vc => vc.VehicleClassID);
            
            // Relationships

            // BoatSale → City
            modelBuilder.Entity<BoatSale>()
                .HasOne(bs => bs.City)
                .WithMany(c => c.BoatSales) // inverse navigation
                .HasForeignKey(bs => bs.CityID)
                .HasConstraintName("FK_BoatSale_City");


            // BoatPhoto → BoatSale
            modelBuilder.Entity<BoatPhoto>()
                .HasOne(bp => bp.BoatSale)
                .WithMany(bs => bs.Photos)
                .HasForeignKey(bp => bp.BoatID)
                .HasConstraintName("FK_BoatPhoto_BoatSale");

            // BoatVideo → BoatSale
            modelBuilder.Entity<BoatVideo>()
                .HasOne(bv => bv.BoatSale)
                .WithMany(bs => bs.Videos)
                .HasForeignKey(bv => bv.Boat_VehicleID)
                .HasConstraintName("FK_dbo.BoatVideo_dbo.BoatSale_Boat_VehicleID");


            // Store enums as strings in the database
            modelBuilder.Entity<BoatSale>()
                .Property(bs => bs.ListingType)
                .HasConversion(
                    v => v.ToString(), 
                    v => (Enums.ListingType)Enum.Parse(typeof(Enums.ListingType), v)
                );

            modelBuilder.Entity<BoatSale>()
                .Property(bs => bs.Drive)
                .HasConversion(
                     v => v.HasValue ? v.Value.ToString() : null, 
                    v => v != null ? (Enums.DriveType)Enum.Parse(typeof(Enums.DriveType), v) : (Enums.DriveType?)null
                );

            modelBuilder.Entity<BoatSale>()
                .Property(bs => bs.FuelType)
                .HasConversion(
                    v => v.HasValue ? v.Value.ToString() : null, 
                    v => v != null ? (Enums.FuelType)Enum.Parse(typeof(Enums.FuelType), v) : (Enums.FuelType?)null
                );


            // Status is already int in DB, keep as is
            modelBuilder.Entity<BoatSale>()
                .Property(bs => bs.Status)
                .HasConversion<int>();

        }
    }
}
