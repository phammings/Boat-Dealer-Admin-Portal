using BoatAdminApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BoatAdminApi.Repositories
{
    public interface IBoatVideoRepository
    {
        Task<BoatVideo?> GetAsync(int id);
        Task<IEnumerable<BoatVideo>> GetByBoatIdAsync(int boatId);
        Task<BoatVideo> CreateAsync(BoatVideo video);
        Task UpdateAsync(BoatVideo video);
        Task DeleteAsync(BoatVideo video);
    }
}
