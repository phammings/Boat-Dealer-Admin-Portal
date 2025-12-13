namespace BoatAdminApi.DTOs
{
    public class BoatPhotoDto
    {
        public int BoatPhotoID { get; set; }
        public string? PhotoTitle { get; set; }
        public string? PhotoDescription { get; set; }
        public string PhotoURL { get; set; } = string.Empty;
        public bool IsPrimary { get; set; }
        public bool Active { get; set; }
        public bool Hide { get; set; }
    }
}
