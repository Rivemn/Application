using Domain.Models;
using Domain.Repositories;
using Domain.Services;

namespace Application.Services
{
    public class AmenityService : IAmenityService
    {
        private readonly IAmenityRepository _repository;

        public AmenityService(IAmenityRepository repository)
        {
            _repository = repository;
        }

        public async Task<(List<Amenity>, string)> GetAllAsync()
        {
            var amenities = await _repository.GetAllAsync();
            return (amenities, string.Empty);
        }

        public async Task<(Amenity?, string)> GetByIdAsync(int id)
        {
            var amenity = await _repository.GetByIdAsync(id);
            return amenity == null ? (null, "Amenity not found") : (amenity, string.Empty);
        }

        public async Task<(int, string)> CreateAsync(string name)
        {
            var (amenity, error) = Amenity.Create(0, name);
            if (!string.IsNullOrEmpty(error))
                return (0, error);

            var id = await _repository.CreateAsync(amenity);
            return (id, string.Empty);
        }

        public async Task<(bool, string)> DeleteAsync(int id)
        {
            var success = await _repository.DeleteAsync(id);
            return success ? (true, string.Empty) : (false, "Amenity not found");
        }
    }
}
