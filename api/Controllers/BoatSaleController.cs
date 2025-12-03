using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BoatAdminApi.Data;
using BoatAdminApi.Models;
using BoatAdminApi.Helpers;

namespace BoatAdminApi.Controllers
{
    [ApiController]
    [Route("api/boats")]
    public class BoatSaleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BoatSaleController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BoatSale
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetBoats()
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            var boats = await (from bs in _context.BoatSales
                            where bs.SellerID == dealerId
                            join vc in _context.VehicleClasses
                                on bs.ClassCode equals vc.Code into vcJoin
                            from vc in vcJoin.DefaultIfEmpty() // left join, in case ClassCode is null
                            select new 
                            {
                                bs.BoatID,
                                bs.Make,
                                bs.Model,
                                bs.ClassCode,
                                ClassName = vc != null ? vc.Name : null,
                                bs.CityID,
                                bs.Price,
                                bs.ListingType,
                                bs.Status
                            }).ToListAsync();

            return Ok(boats);

        }

        // GET: api/BoatSale/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BoatSale>> GetBoat(int id)
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            var boat = await _context.BoatSales
                .FirstOrDefaultAsync(b => b.BoatID == id && b.SellerID == dealerId);

            if (boat == null) return NotFound();

            return Ok(boat);
        }

        // POST: api/BoatSale
        [HttpPost]
        public async Task<ActionResult<BoatSale>> CreateBoat(BoatSale boat)
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            boat.SellerID = dealerId;
            _context.BoatSales.Add(boat);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBoat), new { id = boat.BoatID }, boat);
        }

        // PUT: api/BoatSale/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBoat(int id, BoatSale boat)
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            if (id != boat.BoatID) return BadRequest();

            var existingBoat = await _context.BoatSales
                .FirstOrDefaultAsync(b => b.BoatID == id && b.SellerID == dealerId);

            if (existingBoat == null) return NotFound();

            // Update fields
            _context.Entry(existingBoat).CurrentValues.SetValues(boat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/BoatSale/5/deactivate
        [HttpPatch("{id}/deactivate")]
        public async Task<IActionResult> DeactivateBoat(int id)
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            var boat = await _context.BoatSales
                .FirstOrDefaultAsync(b => b.BoatID == id && b.SellerID == dealerId);

            if (boat == null) return NotFound();

            boat.Active = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/BoatSale/5/reactivate
        [HttpPatch("{id}/reactivate")]
        public async Task<IActionResult> ReactivateBoat(int id)
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            var boat = await _context.BoatSales
                .FirstOrDefaultAsync(b => b.BoatID == id && b.SellerID == dealerId);

            if (boat == null) return NotFound();

            boat.Active = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
