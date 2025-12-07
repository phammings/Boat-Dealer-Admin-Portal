using Microsoft.EntityFrameworkCore;
using BoatAdminApi.Data;
using BoatAdminApi.Models;
using BoatAdminApi.DTOs;

namespace BoatAdminApi.Repositories
{
    public class BoatRepository : IBoatRepository
    {
        private readonly ApplicationDbContext _context;

        public BoatRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BoatListDto>> GetBoatsByDealerAsync(int dealerId)
        {
            return await (from bs in _context.BoatSales
                          where bs.SellerID == dealerId
                          join vc in _context.VehicleClasses
                              on bs.ClassCode equals vc.Code into vcJoin
                          from vc in vcJoin.DefaultIfEmpty()
                          join cat in _context.VehicleCategories
                              on vc.VehicleCategoryID equals cat.VehicleCategoryID into catJoin
                          from cat in catJoin.DefaultIfEmpty()
                          join city in _context.Cities
                              on bs.CityID equals city.CityID into cityJoin
                          from city in cityJoin.DefaultIfEmpty()
                          select new BoatListDto
                          {
                              BoatID = bs.BoatID,
                              Make = bs.Make,
                              Model = bs.Model,
                              BoatYear = bs.BoatYear,
                              Status = bs.Status.ToString(),
                              City = city != null ? city.Name : null,
                              Category = cat != null ? cat.Name : null,
                              Class = vc != null ? vc.Name : null,
                              StockNumber = bs.StockNum
                          }).ToListAsync();
        }

        public async Task<BoatSale?> GetBoatByIdAsync(int dealerId, int boatId)
        {
             return await _context.BoatSales
                .Where(b => b.BoatID == boatId && b.SellerID == dealerId)
                .Include(b => b.VehicleClass) 
                .FirstOrDefaultAsync();
        }

        public async Task<BoatSale> CreateBoatAsync(BoatSale boat)
        {
            _context.BoatSales.Add(boat);
            await _context.SaveChangesAsync();
            return boat;
        }

        public async Task UpdateBoatAsync(BoatSale boat)
        {
            _context.Entry(boat).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task SetActiveStatusAsync(int dealerId, int boatId, bool active)
        {
            var boat = await GetBoatByIdAsync(dealerId, boatId);
            if (boat != null)
            {
                boat.Active = active;
                await _context.SaveChangesAsync();
            }
        }
    }
}
