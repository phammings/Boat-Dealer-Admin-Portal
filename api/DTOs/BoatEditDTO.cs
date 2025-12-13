using System.ComponentModel.DataAnnotations;

namespace BoatAdminApi.DTOs
{
    public class BoatEditDTO
    {
        [Required]
        public int BoatID { get; set; }

        [Required]
        public string BoatType { get; set; } = null!;

        [Required]
        public string ClassCode { get; set; } = null!;

        [Required]
        public string Make { get; set; } = null!;

        public string? Model { get; set; }
        public int BoatYear { get; set; }
        public decimal? Price { get; set; }
        public int? PriceType { get; set; }
        public int Length { get; set; }
        public int? BeamFt { get; set; }
        public int? DraftFt { get; set; }
        public int? Weight { get; set; }
        public string? Engine { get; set; }
        public int? NumEngines { get; set; }
        public int? HP { get; set; }
        public string? Drive { get; set; }
        public int? Hours { get; set; }
        public string? FuelType { get; set; } // "N/A" supported
        public string? Description { get; set; }
        public int? CityID { get; set; }
    }
}
