using Microsoft.EntityFrameworkCore;
using BoatAdminApi.Data;
using BoatAdminApi.Models;
using BoatAdminApi.DTOs;

namespace BoatAdminApi.Repositories
{
    public class VehicleLookupRepository : IVehicleLookupRepository
    {
        private readonly ApplicationDbContext _context;

        public VehicleLookupRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<VehicleCategory>> GetBoatCategoriesAsync(int vehicleType)
        {
            return await _context.VehicleCategories
                .Where(x => x.VehicleType == vehicleType)
                .OrderBy(x => x.Name)
                .ToListAsync();
        }

        public async Task<List<VehicleClass>> GetClassesByCategoryAsync(int categoryId)
        {
            return await _context.VehicleClasses
                .Where(x => x.VehicleCategoryID == categoryId)
                .OrderBy(x => x.Name)
                .ToListAsync();
        }

        
    }
}
