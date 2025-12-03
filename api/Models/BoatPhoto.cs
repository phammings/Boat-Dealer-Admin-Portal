using System.ComponentModel.DataAnnotations;

namespace BoatAdminApi.Models
{
    public class BoatPhoto
    {
        [Key]
        public int BoatPhotoID { get; set; }
        public int BoatID { get; set; }

        public byte[]? BoatPhotoData { get; set; }

        [StringLength(255)]
        public string? PhotoDescription { get; set; }

        [StringLength(100)]
        public string? PhotoTitle { get; set; }

        public int? IsPrimary { get; set; }
        public bool Processed { get; set; }
        [StringLength(255)]
        public string? PhotoURL { get; set; }
        public bool Active { get; set; }
        public bool Hide { get; set; }
        public bool? Valid { get; set; }

        // Navigation
        public BoatSale? BoatSale { get; set; }
    }
}
