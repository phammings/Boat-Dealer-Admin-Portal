using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/cities")]
public class CitiesController : ControllerBase
{
    private readonly ICityService _cityService;

    public CitiesController(ICityService cityService)
    {
        _cityService = cityService;
    }

    /// <summary>
    /// Get city by ID (used for edit mode autocomplete prefill)
    /// </summary>
    [HttpGet("{cityId}")]
    public async Task<IActionResult> GetCityById(int cityId)
    {
        var city = await _cityService.GetCityByIdAsync(cityId);

        if (city == null)
            return NotFound();

        return Ok(city);
    }
}
