using BoatAdminApi.Models;

public class VehicleLookupService : IVehicleLookupService
{
    private readonly IVehicleLookupRepository _repo;

    public VehicleLookupService(IVehicleLookupRepository repo)
    {
        _repo = repo;
    }
    

    public Task<List<VehicleCategory>> GetBoatCategoriesAsync(int vehicleType)
        => _repo.GetBoatCategoriesAsync(vehicleType);

    public Task<List<VehicleClass>> GetClassesByCategoryAsync(int categoryId)
        => _repo.GetClassesByCategoryAsync(categoryId);
}
