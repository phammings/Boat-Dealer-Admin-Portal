public class BoatDTO
{
    public int BoatID { get; set; }

    // Listing
    public string ListingType { get; set; } = null!;
    public string StockNumber { get; set; } = null!;
    public string Condition { get; set; } = null!;
    public int Status { get; set; }

    // Classification
    public int BoatType { get; set; }
    public int ClassCode { get; set; }

    // Identity
    public string Make { get; set; } = null!;
    public string? Model { get; set; }
    public int BoatYear { get; set; }

    // Pricing
    public decimal Price { get; set; }
    public string Currency { get; set; } = "CAD";

    // Dimensions
    public int LengthFt { get; set; }
    public int? LengthIn { get; set; }
    public int? BeamFt { get; set; }
    public int? BeamIn { get; set; }
    public int? DraftFt { get; set; }
    public int? DraftIn { get; set; }
    public int? Weight { get; set; }

    // Engine
    public string? Engine { get; set; }
    public int? NumEngines { get; set; }
    public decimal? HP { get; set; }
    public string? Drive { get; set; }
    public int? Hours { get; set; }
    public string? FuelType { get; set; }

    // Description / Location
    public string? Description { get; set; }
    public int CityID { get; set; }
}
