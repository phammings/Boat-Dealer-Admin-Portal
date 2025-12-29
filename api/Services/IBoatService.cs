using BoatAdminApi.Models;
using BoatAdminApi.DTOs;

namespace BoatAdminApi.Services
{
    public interface IBoatService
    {
        Task<IEnumerable<BoatListDto>> GetBoatsAsync(int dealerId);
        Task<BoatDTO> GetBoatAsync(int dealerId, int boatId);
        Task<BoatSale> CreateBoatAsync(int dealerId, BoatCreateDTO req);
        Task UpdateBoatAsync(int dealerId, BoatEditDTO req);
        Task SetActiveStatusAsync(int dealerId, int boatId, bool active);
    }
}
