using BoatAdminApi.Repositories;
using BoatAdminApi.DTOs;

public class BoatPhotoService : IBoatPhotoService
{
    private readonly IBoatPhotoRepository _repo;
    private readonly IStorageRepository _storage;

    public BoatPhotoService(
        IBoatPhotoRepository repo,
        IStorageRepository storage)
    {
        _repo = repo;
        _storage = storage;
    }

    public BoatPhotoUploadResponseDto RequestUpload(BoatPhotoUploadRequestDto dto)
    {
        if (!dto.ContentType.StartsWith("image/"))
            throw new InvalidOperationException("Invalid file type");

        var key = $"boats/{dto.BoatID}/{Guid.NewGuid()}-{dto.FileName}";

        var photo = _repo.CreatePendingPhoto(dto.BoatID, key, dto.IsPrimary);

        var uploadUrl = _storage.GeneratePresignedUrl(key, dto.ContentType);

        return new BoatPhotoUploadResponseDto
        {
            UploadUrl = uploadUrl,
            BoatPhotoID = photo.BoatPhotoID,
            FileKey = key
        };
    }

    public async Task<IEnumerable<BoatPhotoDto>> GetPhotosByBoatIdAsync(int boatId)
    {
        var photos = await _repo.GetByBoatIdAsync(boatId);

        return photos.Select(p => new BoatPhotoDto
        {
            BoatPhotoID = p.BoatPhotoID,
            PhotoTitle = p.PhotoTitle,
            PhotoDescription = p.PhotoDescription,
            PhotoURL = _storage.GeneratePresignedGetUrl(p.PhotoKey),
            IsPrimary = p.IsPrimary,
            Active = p.Active,
            Hide = p.Hide
        });
    }

    public async Task UpdatePhotoMetadataAsync(int photoId, UpdatePhotoDto dto)
    {
        var photo = await _repo.GetAsync(photoId);
        if (photo == null)
            throw new KeyNotFoundException("Photo not found");

        photo.PhotoTitle = dto.PhotoTitle;
        photo.PhotoDescription = dto.PhotoDescription;
        photo.IsPrimary = dto.IsPrimary;

        await _repo.UpdateAsync(photo);
    }

    public async Task DeletePhotoAsync(int photoId)
    {
        var photo = await _repo.GetAsync(photoId);
        if (photo == null)
            throw new KeyNotFoundException("Photo not found");

        await _storage.DeleteAsync(photo.PhotoKey);
        await _repo.DeleteAsync(photo);
    }
}
