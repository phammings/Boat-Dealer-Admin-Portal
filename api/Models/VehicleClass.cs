using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BoatAdminApi.Models
{
    public class VehicleClass
    {
        [Key]
        public int VehicleClassID { get; set; }
        public int VehicleCategoryID { get; set; }

        [StringLength(50)]
        public string Name { get; set; } = null!;

        [StringLength(50)]
        public string NormalName { get; set; } = null!;

        [StringLength(3)]
        public string Code { get; set; } = null!;

        // Navigation
        public VehicleCategory? VehicleCategory { get; set; }
        public ICollection<BoatSale>? BoatSales { get; set; }
    }
}
