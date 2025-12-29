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
            bool condition = true;

            if (req.condition == "New")
            {
                condition = true;
            }
            else if (req.condition == "Used")
            {
                condition = false;
            }
            else
            {
                throw new ArgumentException("Invalid condition value");
            }

            if (req.currency == "CAD") // CAD
            {
                priceCAD = req.Price;
                priceUSD = 0;
                priceType = 0;
            }
            else if (req.currency == "USD") // USD
            {
                priceUSD = req.Price;
                priceCAD = 0;
                priceType = 1;
            }
            else
            {
                throw new ArgumentException("Invalid currency value");
            }

            // ---- Map DTO → Entity ----
            var boat = new BoatSale
            {
                SellerID = dealerId,

                // Listing
                ListingType = Enum.Parse<ListingType>(req.ListingType),
                StockNum = req.stockNumber,
                New = condition,
                Status = (BoatStatus)req.Status,

                // Classification
                BoatType = req.BoatType,
                ClassCode = req.ClassCode,

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
                LengthIn= req.LengthIn,
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
                // BoatCity = req.BoatCity,
                // BoatProvince = req.BoatProvince,
                // BoatCountry = req.BoatCountry,

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
            var boat = await _repo.GetBoatByIdAsync(dealerId, req.BoatID);
            if (boat == null)
                throw new Exception("Boat not found");

            // ---- Condition handling ----
            bool condition;
            if (req.Condition == "New")
                condition = true;
            else if (req.Condition == "Used")
                condition = false;
            else
                throw new ArgumentException("Invalid condition value");

            // ---- Price handling ----
            decimal priceCAD = 0;
            decimal priceUSD = 0;
            int priceType;

            if (req.Currency == "CAD")
            {
                priceCAD = req.Price;
                priceUSD = 0;
                priceType = 0;
            }
            else if (req.Currency == "USD")
            {
                priceUSD = req.Price;
                priceCAD = 0;
                priceType = 1;
            }
            else
            {
                throw new ArgumentException("Invalid currency value");
            }

            // ---- Map DTO → Entity ----
            boat.ListingType = Enum.Parse<ListingType>(req.ListingType);
            boat.StockNum = req.StockNumber;
            boat.New = condition;
            boat.Status = (BoatStatus)req.Status;

            // Classification
            boat.BoatType = req.BoatType;
            boat.ClassCode = req.ClassCode;

            // Identity
            boat.Make = req.Make;
            boat.Model = req.Model;
            boat.BoatYear = req.BoatYear;
            boat.NormalMake = req.Make?.Replace(" ", "").Trim().ToUpperInvariant();
            boat.NormalModel = req.Model?.Replace(" ", "").Trim().ToUpperInvariant();

            // Pricing
            boat.Price = priceCAD;
            boat.PriceUS = priceUSD;
            boat.PriceType = priceType;

            // Dimensions
            boat.Length = req.LengthFt;
            boat.LengthIn = req.LengthIn;
            boat.BeamFt = req.BeamFt;
            boat.BeamIn = req.BeamIn;
            boat.DraftFt = req.DraftFt;
            boat.DraftIn = req.DraftIn;
            boat.Weight = req.Weight;

            // Engine
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

            // Description / Location
            boat.Description = req.Description;
            boat.CityID = req.CityID!.Value;

            // System
            boat.LastModified = DateTime.UtcNow;

            await _repo.UpdateBoatAsync(boat);
        }


        public Task SetActiveStatusAsync(int dealerId, int boatId, bool active)
        {
            return _repo.SetActiveStatusAsync(dealerId, boatId, active);
        }
    }
}
