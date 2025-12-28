using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/lookup")]
public class VehicleCategoriesController : ControllerBase
{
    private readonly IVehicleLookupService _service;

    public VehicleCategoriesController(IVehicleLookupService service)
    {
        _service = service;
    }

    [HttpGet("vehicle-categories")]
    public async Task<IActionResult> GetBoatCategories([FromQuery] int vehicleType)
    {
        return Ok(await _service.GetBoatCategoriesAsync(vehicleType));
    }
}

