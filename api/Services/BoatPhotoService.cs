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

        var photo = _repo.CreatePendingPhoto(
            dto.BoatID,
            null,               // PhotoURL empty for now
            dto.IsPrimary
        );

        var key = $"{dto.BoatID}/{photo.BoatPhotoID}/{dto.FileName}";

        photo.PhotoURL = key;
        _repo.UpdateAsync(photo).Wait();

        var uploadUrl = _storage.GeneratePresignedUrl(
            key,
            dto.ContentType
        );

        return new BoatPhotoUploadResponseDto
        {
            BoatPhotoID = photo.BoatPhotoID,
            UploadUrl = uploadUrl,
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
            PhotoURL = _storage.GeneratePresignedGetUrl(p.PhotoURL!), 
            IsPrimary = p.IsPrimary,
            Active = p.Active,
            Hide = p.Hide
        });
    }

    public async Task DeletePhotoAsync(int photoId)
    {
        var photo = await _repo.GetAsync(photoId);
        if (photo == null)
            throw new KeyNotFoundException("Photo not found");

        await _storage.DeleteAsync(photo.PhotoURL!);
        await _repo.DeleteAsync(photo);
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
}
