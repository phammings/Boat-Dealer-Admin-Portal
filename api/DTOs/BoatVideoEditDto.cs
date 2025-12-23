namespace BoatAdminApi.DTOs
{
    public class BoatVideoEditDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Url { get; set; }
        public int SrcType { get; set; }
        public string? ImageUrl { get; set; }
        public int? Priority { get; set; }
        public bool Active { get; set; }
        public bool Hide { get; set; }
    }
}
