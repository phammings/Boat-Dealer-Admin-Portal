
using BoatAdminApi.Models;

public interface ICityRepository
{
    Task<City?> GetCityByIdAsync(int cityId);
}
