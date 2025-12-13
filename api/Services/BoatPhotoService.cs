using BoatAdminApi.Repositories;

public class BoatPhotoService : IBoatPhotoService
{
    private readonly IBoatPhotoRepository _repo;
    private readonly IStorageRepository _storage;
    private readonly IConfiguration _config;

    public BoatPhotoService(
        IBoatPhotoRepository repo,
        IStorageRepository storage,
        IConfiguration config)
    {
        _repo = repo;
        _storage = storage;
        _config = config;
    }

    public BoatPhotoUploadResponseDto RequestUpload(
        BoatPhotoUploadRequestDto dto)
    {
        if (!dto.ContentType.StartsWith("image/"))
            throw new InvalidOperationException("Invalid file type");

        var key = $"boats/{dto.BoatID}/{Guid.NewGuid()}-{dto.FileName}";

        // 1️⃣ Create DB row FIRST
        var photo = _repo.CreatePendingPhoto(
            dto.BoatID,
            key,
            dto.IsPrimary
        );

        // 2️⃣ Generate upload URL
        var uploadUrl = _storage.GeneratePresignedUrl(
            key,
            dto.ContentType
        );

        return new BoatPhotoUploadResponseDto
        {
            UploadUrl = uploadUrl,
            BoatPhotoID = photo.BoatPhotoID,
            FileKey = key
        };
    }
}
