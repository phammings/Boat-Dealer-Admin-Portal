using Microsoft.AspNetCore.Mvc;
using BoatAdminApi.Models;
using BoatAdminApi.Services;
using BoatAdminApi.DTOs;
using BoatAdminApi.Helpers;

namespace BoatAdminApi.Controllers
{
    [ApiController]
    [Route("api/boats")]
    public class BoatController : ControllerBase
    {
        private readonly IBoatService _service;

        public BoatController(IBoatService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BoatListDto>>> GetBoats()
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            var boats = await _service.GetBoatsAsync(dealerId);
            return Ok(boats);
        }

        [HttpGet("inactive")]
        public async Task<ActionResult<IEnumerable<BoatListInactiveDto>>> GetInactiveBoats()
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            var boats = await _service.GetInactiveBoatsAsync(dealerId);
            return Ok(boats);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<BoatSale>> GetBoat(int id)
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            var boat = await _service.GetBoatAsync(dealerId, id);
            if (boat == null) return NotFound();

            return Ok(boat);
        }

        [HttpPost]
        public async Task<ActionResult<BoatSale>> CreateBoat(BoatCreateDTO req)
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            var created = await _service.CreateBoatAsync(dealerId, req);
            return CreatedAtAction(nameof(GetBoat), new { id = created.BoatID }, created);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBoat(int id, BoatEditDTO req)
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            req.BoatID = id;

            await _service.UpdateBoatAsync(dealerId, req);
            return NoContent();
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateBoatStatus(int id, [FromQuery] bool active)
        {
            int dealerId = DealerHelper.GetDealerId(Request);
            if (dealerId == 0) return Unauthorized();

            try
            {
                await _service.SetActiveStatusAsync(dealerId, id, active);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

    }
}
