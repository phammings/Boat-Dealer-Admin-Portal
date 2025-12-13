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
                Status = (BoatStatus)req.Status,
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


        public async Task UpdateBoatAsync(int dealerId, BoatEditDTO req)
        {
            var boat = await _repo.GetBoatByIdAsync(dealerId, req.BoatID);
            if (boat == null)
                throw new Exception("Boat not found");

            boat.BoatType = req.BoatType;
            boat.ClassCode = req.ClassCode;
            boat.Make = req.Make;
            boat.Model = req.Model;
            boat.BoatYear = req.BoatYear;
            boat.Price = req.Price;
            boat.PriceType = req.PriceType ?? 0;
            boat.Length = req.Length;
            boat.BeamFt = req.BeamFt;
            boat.DraftFt = req.DraftFt;
            boat.Weight = req.Weight;
            boat.Engine = req.Engine;
            boat.NumEngines = req.NumEngines;
            boat.HP = req.HP;
            boat.Drive = req.Drive != null ? Enum.Parse<Enums.DriveType>(req.Drive) : null;
            boat.Hours = req.Hours;
            boat.FuelType = req.FuelType != null
                ? (req.FuelType == "N/A" ? FuelType.None : Enum.Parse<FuelType>(req.FuelType))
                : null;
            boat.Description = req.Description;
            boat.CityID = req.CityID;

            boat.LastModified = DateTime.UtcNow;

            await _repo.UpdateBoatAsync(boat);
        }

        public Task SetActiveStatusAsync(int dealerId, int boatId, bool active)
        {
            return _repo.SetActiveStatusAsync(dealerId, boatId, active);
        }
    }
}
