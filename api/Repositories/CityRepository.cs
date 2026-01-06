using Microsoft.EntityFrameworkCore;
using BoatAdminApi.Data; 
using BoatAdminApi.Models;

public class CityRepository : ICityRepository
{
    private readonly ApplicationDbContext _context;

    public CityRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<City?> GetCityByIdAsync(int cityId)
    {
        return await _context.Cities
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.CityID == cityId);
    }
}
