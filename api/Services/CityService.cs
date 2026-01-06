using BoatAdminApi.DTOs;
using BoatAdminApi.Repositories;

public class CityService : ICityService
{
    private readonly ICityRepository _cityRepository;

    public CityService(ICityRepository cityRepository)
    {
        _cityRepository = cityRepository;
    }

    public async Task<CityDto?> GetCityByIdAsync(int cityId)
    {
        var city = await _cityRepository.GetCityByIdAsync(cityId);

        if (city == null)
            return null;

        return new CityDto
        {
            Value = city.CityID,
            Label = $"{city.Name}, {city.RegionCode}"
        };
    }
}
