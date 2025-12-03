using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BoatAdminApi.Models
{
    public class City
    {
        [Key]
        public int CityID { get; set; }

        [StringLength(75)]
        public string Name { get; set; } = null!;

        [StringLength(75)]
        public string NormalName { get; set; } = null!;

        [StringLength(2)]
        public string RegionCode { get; set; } = null!;

        [StringLength(2)]
        public string CountryCode { get; set; } = null!;

        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

        // GeoLocation skipped (geography type)

        public ICollection<BoatSale>? BoatSales { get; set; }
    }
}
