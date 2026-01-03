using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using BoatAdminApi.Enums;

namespace BoatAdminApi.Models
{
    public class BoatSale
    {
        [Key]
        public int BoatID { get; set; }
        public bool? Hide { get; set; }
        public bool? Active { get; set; }
        public DateTime? PostedDate { get; set; }
        public bool? Sold { get; set; }
        public DateTime? SoldDate { get; set; }
        public bool? New { get; set; }
        public int? SellerID { get; set; }

        [MaxLength(50)]
        public required string BoatType { get; set; }

        [MaxLength(50)]
        public string? Make { get; set; }

        [MaxLength(50)]
        public string? Model { get; set; }

        public required string Description { get; set; }
        public required int Length { get; set; }
        public int? LengthIn { get; set; }
        public required decimal Price { get; set; }
        public int? BoatYear { get; set; }

        public ListingType ListingType { get; set; }
        public decimal? PriceUS { get; set; }
        public int? BeamFt { get; set; }
        public int? BeamIn { get; set; }
        public int? DraftFt { get; set; }
        public int? DraftIn { get; set; }
        public int? Weight { get; set; }

        [MaxLength(50)]
        public string? Engine { get; set; }
        public decimal? HP { get; set; }
        public Enums.DriveType? Drive { get; set; }
        public int? Hours { get; set; }
        public FuelType? FuelType { get; set; }
        public int? NumEngines { get; set; }

        [MaxLength(50)]
        public string? NormalMake { get; set; }

        [MaxLength(50)]
        public string? NormalModel { get; set; }

        public bool AllStates { get; set; }
        [MaxLength(5)]
        public required string ClassCode { get; set; }
        [NotMapped]
        public string? Class => VehicleClass?.Name;
        
        public BoatStatus Status { get; set; }
        public int? CommonMakeId { get; set; }

        [MaxLength(50)]
        public string? StockNum { get; set; }

        [MaxLength(50)]
        public string? BoatProvince { get; set; }

        [MaxLength(50)]
        public string? BoatCity { get; set; }

        [MaxLength(2)]
        public string BoatCountry { get; set; } = "CA";

        public double? BoatLatitude { get; set; }
        public double? BoatLongitude { get; set; }
        public int OwnerUserId { get; set; }
        public bool? LocationChanged { get; set; }
        public int? CityID { get; set; }
        public decimal? SearchPrice { get; set; }
        public int PriceType { get; set; }
        public DateTime? LastModified { get; set; }

        // Navigation properties
        public City? City { get; set; }
        [JsonIgnore] 
        public VehicleClass? VehicleClass { get; set; }
        [JsonIgnore] 
        public ICollection<BoatPhoto>? Photos { get; set; }
        [JsonIgnore] 
        public ICollection<BoatVideo>? Videos { get; set; }
    }
}
