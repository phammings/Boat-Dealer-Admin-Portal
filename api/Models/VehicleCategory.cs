using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BoatAdminApi.Models
{
    public class VehicleCategory
    {
        [Key]
        public int VehicleCategoryID { get; set; }
        public int VehicleType { get; set; }

        [StringLength(50)]
        public string Name { get; set; } = null!;

        [StringLength(50)]
        public string NormalName { get; set; } = null!;

        [StringLength(3)]
        public string Code { get; set; } = null!;

        public ICollection<VehicleClass>? VehicleClasses { get; set; }
    }
}
