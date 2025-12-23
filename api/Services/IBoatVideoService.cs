using BoatAdminApi.DTOs;
using BoatAdminApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BoatAdminApi.Services
{
    public interface IBoatVideoService
    {
        Task<IEnumerable<BoatVideoDto>> GetVideosByBoatIdAsync(int boatId);
        Task<BoatVideo?> GetVideoAsync(int id);
        Task<BoatVideo> CreateVideoAsync(BoatVideoCreateDto dto);
        Task UpdateVideoAsync(BoatVideoEditDto dto);
        Task SetActiveStatusAsync(int id, bool active);
    }
}
