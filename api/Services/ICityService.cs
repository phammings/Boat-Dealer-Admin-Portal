public interface ICityService
{
    Task<CityDto?> GetCityByIdAsync(int cityId);
}
