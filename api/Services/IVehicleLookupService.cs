using BoatAdminApi.Models;

public interface IVehicleLookupService
{
    Task<List<VehicleCategory>> GetBoatCategoriesAsync(int vehicleType);
    Task<List<VehicleClass>> GetClassesByCategoryAsync(int categoryId);
}
