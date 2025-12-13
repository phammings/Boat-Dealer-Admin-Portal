using BoatAdminApi.Data;
using BoatAdminApi.Models;
using Microsoft.EntityFrameworkCore;

public class BoatPhotoRepository : IBoatPhotoRepository
{
    private readonly ApplicationDbContext _context;

    public BoatPhotoRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public BoatPhoto CreatePendingPhoto(int boatId, string key, bool isPrimary)
    {
        var photo = new BoatPhoto
        {
            BoatID = boatId,
            PhotoKey = key,
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

    public async Task<BoatPhoto?> GetAsync(int photoId)
    {
        return await _context.BoatPhotos
            .FirstOrDefaultAsync(p => p.BoatPhotoID == photoId);
    }

    public async Task<IEnumerable<BoatPhoto>> GetByBoatIdAsync(int boatId)
    {
        return await _context.BoatPhotos
            .Where(p => p.BoatID == boatId && p.Active && !p.Hide)
            .ToListAsync();
    }

    public async Task UpdateAsync(BoatPhoto photo)
    {
        _context.BoatPhotos.Update(photo);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(BoatPhoto photo)
    {
        _context.BoatPhotos.Remove(photo);
        await _context.SaveChangesAsync();
    }
}
