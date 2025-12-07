using BoatAdminApi.Models;
using BoatAdminApi.DTOs;
using BoatAdminApi.Repositories;

namespace BoatAdminApi.Services
{
    public class BoatService : IBoatService
    {
        private readonly IBoatRepository _repo;

        public BoatService(IBoatRepository repo)
        {
            _repo = repo;
        }

        public Task<IEnumerable<BoatListDto>> GetBoatsAsync(int dealerId)
        {
            return _repo.GetBoatsByDealerAsync(dealerId);
        }

        public Task<BoatSale?> GetBoatAsync(int dealerId, int boatId)
        {
            return _repo.GetBoatByIdAsync(dealerId, boatId);
        }

        public Task<BoatSale> CreateBoatAsync(int dealerId, BoatSale boat)
        {
            boat.SellerID = dealerId;
            boat.Active = true; // persist as active
            return _repo.CreateBoatAsync(boat);
        }

        public Task UpdateBoatAsync(int dealerId, BoatSale boat)
        {
            return _repo.UpdateBoatAsync(boat);
        }

        public Task SetActiveStatusAsync(int dealerId, int boatId, bool active)
        {
            return _repo.SetActiveStatusAsync(dealerId, boatId, active);
        }
    }
}
