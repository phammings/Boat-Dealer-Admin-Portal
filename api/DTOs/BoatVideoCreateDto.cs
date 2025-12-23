namespace BoatAdminApi.DTOs
{
    public class BoatVideoCreateDto
    {
        public int Boat_VehicleID { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Url { get; set; }
        public int SrcType { get; set; }
        public string? ImageUrl { get; set; }
        public int? Priority { get; set; }
        public bool Active { get; set; } = true;
        public bool Hide { get; set; } = false;
    }
}
