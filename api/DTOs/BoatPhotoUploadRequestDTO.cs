namespace BoatAdminApi.DTOs
{
    public class BoatPhotoUploadRequestDto
    {
        public int BoatID { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string ContentType { get; set; } = string.Empty;
        public bool IsPrimary { get; set; } = false;
    }
}
