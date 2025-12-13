namespace BoatAdminApi.DTOs
{
    public class UpdatePhotoDto
    {
        public string? PhotoTitle { get; set; }
        public string? PhotoDescription { get; set; }
        public bool IsPrimary { get; set; }
    }
}
