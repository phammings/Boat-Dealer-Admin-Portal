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
            // ---- Price handling ----
            decimal priceCAD = 0;
            decimal priceUSD = 0;
            int priceType = 0;
            bool condition = req.Condition == "New" ? true :
                            req.Condition == "Used" ? false :
                            throw new ArgumentException("Invalid condition value");

            if (req.Currency == "CAD")
                priceCAD = req.Price;
            else if (req.Currency == "USD")
                priceUSD = req.Price;
            else
                throw new ArgumentException("Invalid currency value");

            // ---- Lookup Class & BoatType from repo ----
            var vehicleClass = await _repo.GetVehicleClassByIdAsync(req.ClassCode)
                ?? throw new ArgumentException("Invalid VehicleClassID");
            var boatType = await _repo.GetBoatTypeByIdAsync(req.BoatType)
                ?? throw new ArgumentException("Invalid BoatTypeID");

            // ---- Map DTO → Entity ----
            var boat = new BoatSale
            {
                SellerID = dealerId,

                // Listing
                ListingType = Enum.Parse<ListingType>(req.ListingType),
                StockNum = req.StockNumber,
                New = condition,
                Status = (BoatStatus)req.Status,

                // Classification
                BoatType = boatType.Code,       // Persist code
                ClassCode = vehicleClass.Code,  // Persist code

                // Identity
                Make = req.Make,
                Model = req.Model,
                BoatYear = req.BoatYear,
                NormalMake = req.Make?.Replace(" ", "").Trim().ToUpperInvariant(),
                NormalModel = req.Model?.Replace(" ", "").Trim().ToUpperInvariant(),

                // Pricing
                Price = priceCAD,
                PriceUS = priceUSD,
                PriceType = priceType,

                // Dimensions
                Length = req.LengthFt,
                LengthIn = req.LengthIn,
                BeamFt = req.BeamFt,
                BeamIn = req.BeamIn,
                DraftFt = req.DraftFt,
                DraftIn = req.DraftIn,
                Weight = req.Weight,

                // Engine
                Engine = req.Engine,
                NumEngines = req.NumEngines,
                HP = req.HP,
                Drive = string.IsNullOrWhiteSpace(req.Drive)
                    ? null
                    : Enum.Parse<Enums.DriveType>(req.Drive),
                Hours = req.Hours,
                FuelType = string.IsNullOrWhiteSpace(req.FuelType) || req.FuelType == "N/A"
                    ? FuelType.None
                    : Enum.Parse<FuelType>(req.FuelType),

                // Description / Location
                Description = req.Description,
                CityID = req.CityID!.Value,

                // System
                Active = true,
                Hide = false,
                PostedDate = DateTime.UtcNow,
                LastModified = DateTime.UtcNow
            };

            return await _repo.CreateBoatAsync(boat);
        }


        public async Task UpdateBoatAsync(int dealerId, BoatEditDTO req)
        {
            var boat = await _repo.GetBoatByIdAsync(dealerId, req.BoatID)
                ?? throw new Exception("Boat not found");

            bool condition = req.Condition == "New" ? true :
                            req.Condition == "Used" ? false :
                            throw new ArgumentException("Invalid condition value");

            decimal priceCAD = 0, priceUSD = 0;
            int priceType = 0;

            if (req.Currency == "CAD") priceCAD = req.Price;
            else if (req.Currency == "USD") priceUSD = req.Price;
            else throw new ArgumentException("Invalid currency value");

            // ---- Lookup Class & BoatType from repo ----
            var vehicleClass = await _repo.GetVehicleClassByIdAsync(req.ClassCode)
                ?? throw new ArgumentException("Invalid VehicleClassID");
            var boatType = await _repo.GetBoatTypeByIdAsync(req.BoatType)
                ?? throw new ArgumentException("Invalid BoatTypeID");

            // ---- Map DTO → Entity ----
            boat.ListingType = Enum.Parse<ListingType>(req.ListingType);
            boat.StockNum = req.StockNumber;
            boat.New = condition;
            boat.Status = (BoatStatus)req.Status;

            boat.BoatType = boatType.Code;
            boat.ClassCode = vehicleClass.Code;

            boat.Make = req.Make;
            boat.Model = req.Model;
            boat.BoatYear = req.BoatYear;
            boat.NormalMake = req.Make?.Replace(" ", "").Trim().ToUpperInvariant();
            boat.NormalModel = req.Model?.Replace(" ", "").Trim().ToUpperInvariant();

            boat.Price = priceCAD;
            boat.PriceUS = priceUSD;
            boat.PriceType = priceType;

            boat.Length = req.LengthFt;
            boat.LengthIn = req.LengthIn;
            boat.BeamFt = req.BeamFt;
            boat.BeamIn = req.BeamIn;
            boat.DraftFt = req.DraftFt;
            boat.DraftIn = req.DraftIn;
            boat.Weight = req.Weight;

            boat.Engine = req.Engine;
            boat.NumEngines = req.NumEngines;
            boat.HP = req.HP;
            boat.Drive = string.IsNullOrWhiteSpace(req.Drive)
                ? null
                : Enum.Parse<Enums.DriveType>(req.Drive);
            boat.Hours = req.Hours;
            boat.FuelType = string.IsNullOrWhiteSpace(req.FuelType) || req.FuelType == "N/A"
                ? FuelType.None
                : Enum.Parse<FuelType>(req.FuelType);

            boat.Description = req.Description;
            boat.CityID = req.CityID!.Value;

            boat.LastModified = DateTime.UtcNow;

            await _repo.UpdateBoatAsync(boat);
        }


        public Task SetActiveStatusAsync(int dealerId, int boatId, bool active)
        {
            return _repo.SetActiveStatusAsync(dealerId, boatId, active);
        }
    }
}
