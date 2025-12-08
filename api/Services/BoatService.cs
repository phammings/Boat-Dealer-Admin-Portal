using BoatAdminApi.Models;
using BoatAdminApi.DTOs;
using BoatAdminApi.Repositories;
using BoatAdminApi.Enums;

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

        public async Task<BoatSale> CreateBoatAsync(int dealerId, BoatCreateDTO req)
        {
            // Validate class exists
            // var vehicleClass = await _repo.GetVehicleClassByCodeAsync(req.ClassCode);
            // if (vehicleClass == null)
            //     throw new Exception($"Vehicle class '{req.ClassCode}' does not exist.");

            // Map DTO to BoatSale entity
            var boat = new BoatSale
            {
                SellerID = dealerId,
                Status = (Enums.BoatStatus)req.Status,
                BoatType = req.BoatType,
                ClassCode = req.ClassCode,
                Make = req.Make,
                Model = req.Model,
                BoatYear = req.BoatYear,
                Price = req.Price,
                PriceType = req.PriceType,
                Length = req.Length,
                BeamFt = req.BeamFt,
                DraftFt = req.DraftFt,
                Weight = req.Weight,
                Engine = req.Engine,
                NumEngines = req.NumEngines,
                HP = req.HP,
                Drive = req.Drive != null ? Enum.Parse<Enums.DriveType>(req.Drive) : null,
                Hours = req.Hours,
                FuelType = req.FuelType != null ? Enum.Parse<FuelType>(req.FuelType) : null,
                Description = req.Description,
                CityID = req.CityID,
                Active = true,
                Hide = false,
                PostedDate = DateTime.UtcNow,
                LastModified = DateTime.UtcNow
            };

            // Use repository to save
            return await _repo.CreateBoatAsync(boat);
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
