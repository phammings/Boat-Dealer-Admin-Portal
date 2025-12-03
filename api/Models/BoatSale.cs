using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

        [StringLength(50)]
        public string? BoatType { get; set; }

        [StringLength(50)]
        public string? Make { get; set; }

        [StringLength(50)]
        public string? Model { get; set; }

        public string? Description { get; set; }
        public int? Length { get; set; }
        public int? LengthIn { get; set; }
        public decimal? Price { get; set; }
        public int? BoatYear { get; set; }

        [StringLength(50)]
        public string? ListingType { get; set; }

        public decimal? PriceUS { get; set; }
        public int? BeamFt { get; set; }
        public int? BeamIn { get; set; }
        public int? DraftFt { get; set; }
        public int? DraftIn { get; set; }
        public int? Weight { get; set; }

        [StringLength(50)]
        public string? Engine { get; set; }

        public decimal? HP { get; set; }

        [StringLength(50)]
        public string? Drive { get; set; }

        public int? Hours { get; set; }

        [StringLength(50)]
        public string? FuelType { get; set; }

        public int? NumEngines { get; set; }

        [StringLength(50)]
        public string? NormalMake { get; set; }

        [StringLength(50)]
        public string? NormalModel { get; set; }

        public bool AllStates { get; set; }

        [StringLength(5)]
        public string? ClassCode { get; set; }

        public int Status { get; set; }
        public int? CommonMakeId { get; set; }

        [StringLength(50)]
        public string? StockNum { get; set; }

        [StringLength(50)]
        public string? BoatProvince { get; set; }

        [StringLength(50)]
        public string? BoatCity { get; set; }

        [StringLength(2)]
        public string BoatCountry { get; set; } = null!;

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
        public ICollection<BoatPhoto>? BoatPhotos { get; set; }
        public ICollection<BoatVideo>? BoatVideos { get; set; }
        public VehicleClass? VehicleClass { get; set; }
    }
}
