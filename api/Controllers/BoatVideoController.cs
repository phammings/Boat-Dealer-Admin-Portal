using Microsoft.AspNetCore.Mvc;
using BoatAdminApi.Services;
using BoatAdminApi.DTOs;

[ApiController]
[Route("api/boats/videos")]
public class BoatVideoController : ControllerBase
{
    private readonly IBoatVideoService _service;

    public BoatVideoController(IBoatVideoService service)
    {
        _service = service;
    }

    [HttpGet("{boatId}")]
    public async Task<IActionResult> GetByBoat(int boatId)
    {
        var videos = await _service.GetVideosByBoatIdAsync(boatId);
        return Ok(videos);
    }

    [HttpGet("video/{id}")]
    public async Task<IActionResult> GetVideo(int id)
    {
        var video = await _service.GetVideoAsync(id);
        if (video == null) return NotFound();
        return Ok(video);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] BoatVideoCreateDto dto)
    {
        var created = await _service.CreateVideoAsync(dto);
        return CreatedAtAction(nameof(GetVideo), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] BoatVideoEditDto dto)
    {
        if (id != dto.Id) return BadRequest("ID mismatch");

        await _service.UpdateVideoAsync(dto);
        return NoContent();
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateVideoStatus(int id, [FromQuery] bool active)
    {
        try
        {
            await _service.SetActiveStatusAsync(id, active);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }
}
