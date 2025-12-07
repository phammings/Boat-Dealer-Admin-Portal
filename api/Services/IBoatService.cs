using BoatAdminApi.Models;
using BoatAdminApi.DTOs;

namespace BoatAdminApi.Services
{
    public interface IBoatService
    {
        Task<IEnumerable<BoatListDto>> GetBoatsAsync(int dealerId);
        Task<BoatSale?> GetBoatAsync(int dealerId, int boatId);
        Task<BoatSale> CreateBoatAsync(int dealerId, BoatSale boat);
        Task UpdateBoatAsync(int dealerId, BoatSale boat);
        Task SetActiveStatusAsync(int dealerId, int boatId, bool active);
    }
}
