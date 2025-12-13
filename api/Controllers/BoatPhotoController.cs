using Microsoft.AspNetCore.Mvc;
using BoatAdminApi.DTOs;

[ApiController]
[Route("api/boats/photos")]
public class BoatPhotoController : ControllerBase
{
    private readonly IBoatPhotoService _service;

    public BoatPhotoController(IBoatPhotoService service)
    {
        _service = service;
    }

    [HttpPost("presigned-upload")]
    public IActionResult RequestUpload([FromBody] BoatPhotoUploadRequestDto dto)
    {
        return Ok(_service.RequestUpload(dto));
    }

    [HttpGet("{boatId}")]
    public async Task<IActionResult> GetPhotos(int boatId)
    {
        var photos = await _service.GetPhotosByBoatIdAsync(boatId);
        return Ok(photos);
    }

    [HttpPut("{photoId}")]
    public async Task<IActionResult> UpdatePhoto(int photoId, [FromBody] UpdatePhotoDto dto)
    {
        await _service.UpdatePhotoMetadataAsync(photoId, dto);
        return NoContent();
    }

    [HttpDelete("{photoId}")]
    public async Task<IActionResult> DeletePhoto(int photoId)
    {
        await _service.DeletePhotoAsync(photoId);
        return NoContent();
    }
}
