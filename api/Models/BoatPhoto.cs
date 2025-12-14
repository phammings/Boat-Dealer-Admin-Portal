using System.ComponentModel.DataAnnotations;

namespace BoatAdminApi.Models
{
    public class BoatPhoto
    {
        [Key]
        public int BoatPhotoID { get; set; }

        [Required]
        public int BoatID { get; set; }

        // S3 object key (stored in PhotoURL)
        [StringLength(255)]
        public string? PhotoURL { get; set; }

        [StringLength(255)]
        public string? PhotoDescription { get; set; }

        [StringLength(100)]
        public string? PhotoTitle { get; set; }

        public bool IsPrimary { get; set; }

        public bool Processed { get; set; }

        public bool Active { get; set; }

        public bool Hide { get; set; }

        public bool? Valid { get; set; }

        // Navigation
        public BoatSale? BoatSale { get; set; }
    }
}
