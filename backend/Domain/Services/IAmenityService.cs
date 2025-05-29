using Domain.Models;

namespace Domain.Services
{
    public interface IAmenityService
    {
        Task<(List<Amenity> amenities, string error)> GetAllAsync();
        Task<(Amenity? amenity, string error)> GetByIdAsync(int id);
        Task<(int id, string error)> CreateAsync(string name);
        Task<(bool success, string error)> DeleteAsync(int id);
    }
}
