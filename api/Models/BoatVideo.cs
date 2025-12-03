using System;
using System.ComponentModel.DataAnnotations;

namespace BoatAdminApi.Models
{
    public class BoatVideo
    {
        [Key]
        public int Id { get; set; }

        public string? Description { get; set; }
        public string? Title { get; set; }
        public string? Url { get; set; }
        public bool? Active { get; set; }
        public bool? Hide { get; set; }
        public int SrcType { get; set; }
        public DateTime? LastVerified { get; set; }
        public int? Boat_VehicleID { get; set; }
        public string? ImageUrl { get; set; }
        public int? Priority { get; set; }

        // Navigation
        public BoatSale? BoatSale { get; set; }
    }
}
