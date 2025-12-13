public class BoatPhotoUploadRequestDto
{
    public int BoatID { get; set; }
    public string FileName { get; set; }
    public string ContentType { get; set; }
    public bool IsPrimary { get; set; }
}
