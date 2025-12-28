using BoatAdminApi.Models;

public interface IVehicleLookupRepository
{
    Task<List<VehicleCategory>> GetBoatCategoriesAsync(int vehicleType);
    Task<List<VehicleClass>> GetClassesByCategoryAsync(int categoryId);
}
