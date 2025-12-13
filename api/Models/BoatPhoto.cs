using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoatAdminApi.Models
{
    public class BoatPhoto
    {
        [Key]
        public int BoatPhotoID { get; set; }

        [Required]
        public int BoatID { get; set; }

        /// <summary>
        /// S3 object key stored in dbo.BoatPhoto.BoatPhoto
        /// </summary>
        [Required]
        [StringLength(255)]
        [Column("BoatPhoto")]
        public string PhotoKey { get; set; } = null!;

        [StringLength(255)]
        public string? PhotoDescription { get; set; }

        [StringLength(100)]
        public string? PhotoTitle { get; set; }

        [Required]
        public bool IsPrimary { get; set; }

        [Required]
        public bool Processed { get; set; }

        [StringLength(255)]
        public string? PhotoURL { get; set; }

        [Required]
        public bool Active { get; set; }

        [Required]
        public bool Hide { get; set; }

        [Required]
        public bool Valid { get; set; }

        // -------------------------
        // Navigation Properties
        // -------------------------

        public BoatSale? BoatSale { get; set; }
    }
}
