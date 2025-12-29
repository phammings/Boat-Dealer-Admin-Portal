using System.ComponentModel.DataAnnotations;

namespace BoatAdminApi.DTOs
{
    public class BoatEditDTO
    {
        // REQUIRED
        [Required]
        public int BoatID { get; set; }

        [Required]
        public required string ListingType { get; set; }

        [Required]
        public required string StockNumber { get; set; }

        [Required]
        public required string Condition { get; set; } // "New" | "Used"

        [Required]
        public required int Status { get; set; }

        [Required]
        public required string BoatType { get; set; }

        [Required]
        public required string ClassCode { get; set; }

        [Required]
        public required string Make { get; set; }

        public string? Model { get; set; }

        [Required]
        public int BoatYear { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public required string Currency { get; set; } // CAD | USD

        [Required]
        public int LengthFt { get; set; }

        [Required]
        public required string? Description { get; set; }

        [Required]
        public required int? CityID { get; set; }

        // OPTIONAL
        public int? LengthIn { get; set; }
        public int? BeamFt { get; set; }
        public int? BeamIn { get; set; }
        public int? DraftFt { get; set; }
        public int? DraftIn { get; set; }
        public int? Weight { get; set; }

        public string? Engine { get; set; }
        public int? NumEngines { get; set; }
        public decimal? HP { get; set; }

        public string? Drive { get; set; }      // enum
        public int? Hours { get; set; }
        public string? FuelType { get; set; }   // supports "N/A"
    }
}
