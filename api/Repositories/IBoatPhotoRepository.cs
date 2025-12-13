using BoatAdminApi.Models;
using BoatAdminApi.DTOs;

namespace BoatAdminApi.Repositories
{
    public interface IBoatPhotoRepository
    {
        BoatPhoto CreatePendingPhoto(
            int boatId,
            string fileKey,
            bool isPrimary
        );
        void MarkUploaded(int boatPhotoId, string photoUrl);
    }
}
