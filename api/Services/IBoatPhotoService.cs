using BoatAdminApi.DTOs;

public interface IBoatPhotoService
{
    BoatPhotoUploadResponseDto RequestUpload(BoatPhotoUploadRequestDto dto);

    Task<IEnumerable<BoatPhotoDto>> GetPhotosByBoatIdAsync(int boatId);

    Task UpdatePhotoMetadataAsync(int photoId, UpdatePhotoDto dto);

    Task DeletePhotoAsync(int photoId);
}
