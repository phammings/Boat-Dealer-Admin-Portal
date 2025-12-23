using BoatAdminApi.DTOs;
using BoatAdminApi.Models;
using BoatAdminApi.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoatAdminApi.Services
{
    public class BoatVideoService : IBoatVideoService
    {
        private readonly IBoatVideoRepository _repo;

        public BoatVideoService(IBoatVideoRepository repo)
        {
            _repo = repo;
        }

        public async Task<BoatVideo?> GetVideoAsync(int id)
        {
            return await _repo.GetAsync(id);
        }

        public async Task<IEnumerable<BoatVideoDto>> GetVideosByBoatIdAsync(int boatId)
        {
            var videos = await _repo.GetByBoatIdAsync(boatId);

            return videos.Select(v => new BoatVideoDto
            {
                Id = v.Id,
                Title = v.Title,
                Description = v.Description,
                Url = v.Url,
                Active = v.Active,
                Hide = v.Hide,
                SrcType = v.SrcType,
                LastVerified = v.LastVerified,
                Boat_VehicleID = v.Boat_VehicleID,
                ImageUrl = v.ImageUrl,
                Priority = v.Priority
            });
        }

        public async Task<BoatVideo> CreateVideoAsync(BoatVideoCreateDto dto)
        {
            var video = new BoatVideo
            {
                Boat_VehicleID = dto.Boat_VehicleID,
                Title = dto.Title,
                Description = dto.Description,
                Url = dto.Url,
                SrcType = dto.SrcType,
                ImageUrl = dto.ImageUrl,
                Priority = dto.Priority,
                Active = dto.Active,
                Hide = dto.Hide
            };

            return await _repo.CreateAsync(video);
        }

        public async Task UpdateVideoAsync(BoatVideoEditDto dto)
        {
            var video = await _repo.GetAsync(dto.Id);
            if (video == null)
                throw new KeyNotFoundException("Video not found");

            video.Title = dto.Title;
            video.Description = dto.Description;
            video.Url = dto.Url;
            video.SrcType = dto.SrcType;
            video.ImageUrl = dto.ImageUrl;
            video.Priority = dto.Priority;
            video.Active = dto.Active;
            video.Hide = dto.Hide;

            await _repo.UpdateAsync(video);
        }

        public async Task SetActiveStatusAsync(int id, bool active)
        {
            var video = await _repo.GetAsync(id);
            if (video == null)
                throw new KeyNotFoundException("Video not found");

            video.Active = active;
            await _repo.UpdateAsync(video);
        }
    }
}
