using Microsoft.AspNetCore.Mvc;

namespace BoatAdminApi.Controllers
{
    [ApiController]
    [Route("api/boats")]
    public class BoatPhotoController : ControllerBase
    {
        private readonly IBoatPhotoService _service;

        public BoatPhotoController(IBoatPhotoService service)
        {
            _service = service;
        }

        [HttpPost("presigned-upload")]
        public IActionResult RequestUpload(
            [FromBody] BoatPhotoUploadRequestDto dto)
        {
            return Ok(_service.RequestUpload(dto));
        }
        

    }
}

