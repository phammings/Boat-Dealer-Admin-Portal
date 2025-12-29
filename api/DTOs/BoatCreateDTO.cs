using System;
using System.ComponentModel.DataAnnotations;
using BoatAdminApi.Enums;

namespace BoatAdminApi.DTOs
{
    public class BoatCreateDTO
    {
        // REQUIRED
        [Required]
        public required string ListingType { get; set; }
        [Required]
        public required string stockNumber { get; set; }
        [Required]
        public required string condition { get; set; }
        [Required]
        public required int Status { get; set; }

        [Required]
        public required string BoatType { get; set; }

        [Required]
        public required string ClassCode { get; set; }

        [Required]
        public required string Make { get; set; }

        [Required]
        public required string? Model { get; set; }

        [Required]
        public required int BoatYear { get; set; }
        [Required]
        public required decimal Price { get; set; }
        [Required]
        public required string currency { get; set; }

        [Required]
        public int LengthFt { get; set; }

        [Required]
        public required string? Description { get; set; }

        [Required]
        public required int? CityID { get; set; }

        // OPTIONAL FIELDS
        public int? LengthIn { get; set; }
        public int? BeamFt { get; set; }
        public int? BeamIn { get; set; }
        public int? DraftFt { get; set; }
        public int? DraftIn { get; set; }
        public int? Weight { get; set; }

        public string? Engine { get; set; }
        public int? NumEngines { get; set; }
        public decimal? HP { get; set; }

        public string? Drive { get; set; }         // maps to DriveType enum
        public int? Hours { get; set; }

        public string? FuelType { get; set; }      // maps to FuelType enum


        // REQUIRED (Dealer)
        [Required]
        public int SellerID { get; set; }
    }
}
