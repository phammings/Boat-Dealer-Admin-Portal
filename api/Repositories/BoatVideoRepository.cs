using BoatAdminApi.Data;
using BoatAdminApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoatAdminApi.Repositories
{
    public class BoatVideoRepository : IBoatVideoRepository
    {
        private readonly ApplicationDbContext _context;

        public BoatVideoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<BoatVideo?> GetAsync(int id)
        {
            return await _context.BoatVideos
                .FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task<IEnumerable<BoatVideo>> GetByBoatIdAsync(int boatId)
        {
            return await _context.BoatVideos
                .Where(v => v.Boat_VehicleID == boatId && (v.Active ?? true) && !(v.Hide ?? false))
                .ToListAsync();
        }

        public async Task<BoatVideo> CreateAsync(BoatVideo video)
        {
            _context.BoatVideos.Add(video);
            await _context.SaveChangesAsync();
            return video;
        }

        public async Task UpdateAsync(BoatVideo video)
        {
            _context.BoatVideos.Update(video);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(BoatVideo video)
        {
            _context.BoatVideos.Remove(video);
            await _context.SaveChangesAsync();
        }
    }
}
