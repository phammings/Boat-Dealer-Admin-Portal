using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/lookup")]
public class VehicleClassesController : ControllerBase
{
    private readonly IVehicleLookupService _service;

    public VehicleClassesController(IVehicleLookupService service)
    {
        _service = service;
    }

    [HttpGet("vehicle-classes")]
    public async Task<IActionResult> GetByCategory([FromQuery] int categoryId)
    {
        return Ok(await _service.GetClassesByCategoryAsync(categoryId));
    }
}

