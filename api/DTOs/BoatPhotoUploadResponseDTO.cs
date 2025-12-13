namespace BoatAdminApi.DTOs
{
    public class BoatPhotoUploadResponseDto
    {
        public int BoatPhotoID { get; set; }
        public string UploadUrl { get; set; } = string.Empty;
        public string FileKey { get; set; } = string.Empty;
    }
}
