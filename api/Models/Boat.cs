namespace BoatAdminApi.Models
{
    public class Boat
    {
        public int Id { get; set; }
        public int DealerId { get; set; }  // assume logged-in dealer
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public decimal PriceCDN { get; set; }
        public string Status { get; set; }
        public string Condition { get; set; }
    }
}
