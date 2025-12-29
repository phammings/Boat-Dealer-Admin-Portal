using BoatAdminApi.Models;
using BoatAdminApi.DTOs;

namespace BoatAdminApi.Repositories
{
    public interface IBoatRepository
    {
        Task<IEnumerable<BoatListDto>> GetBoatsByDealerAsync(int dealerId);
        Task<BoatSale?> GetBoatByIdAsync(int dealerId, int boatId);
        Task<BoatSale> CreateBoatAsync(BoatSale boat);
        Task UpdateBoatAsync(BoatSale boat);
        Task SetActiveStatusAsync(int dealerId, int boatId, bool active);
        Task<VehicleClass?> GetVehicleClassByIdAsync(int vehicleClassId);
        Task<VehicleCategory?> GetBoatTypeByIdAsync(int boatTypeId);
        Task<VehicleClass?> GetVehicleClassByCodeAsync(string code);
        Task<VehicleCategory?> GetBoatTypeByCodeAsync(string code);
    }
}
