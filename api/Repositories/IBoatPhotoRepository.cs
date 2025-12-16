using BoatAdminApi.Models;

public interface IBoatPhotoRepository
{
    BoatPhoto CreatePendingPhoto(int boatId, string? key, bool isPrimary);

    Task<BoatPhoto?> GetAsync(int photoId);

    Task<IEnumerable<BoatPhoto>> GetByBoatIdAsync(int boatId);

    Task UpdateAsync(BoatPhoto photo);

    Task DeleteAsync(BoatPhoto photo);
}
