using Microsoft.EntityFrameworkCore;
using BoatAdminApi.Data;
using BoatAdminApi.Models;
using BoatAdminApi.DTOs;

namespace BoatAdminApi.Repositories
{
    public class BoatPhotoRepository : IBoatPhotoRepository
    {
        private readonly ApplicationDbContext _context;

        public BoatPhotoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public BoatPhoto CreatePendingPhoto(
            int boatId,
            string fileKey,
            bool isPrimary)
        {
            var photo = new BoatPhoto
            {
                BoatID = boatId,
                PhotoKey = fileKey,
                IsPrimary = isPrimary,
                Processed = false,
                Active = true,
                Hide = false,
                Valid = true
            };

            _context.BoatPhotos.Add(photo);
            _context.SaveChanges();

            return photo;
        }

        public void MarkUploaded(int boatPhotoId, string photoUrl)
        {
            var photo = _context.BoatPhotos.Find(boatPhotoId);
            photo.PhotoURL = photoUrl;
            _context.SaveChanges();
        }
    
    }
}
