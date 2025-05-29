using Domain.Models;


namespace Domain.Repositories
{
    public interface IAmenityRepository
    {
        Task<List<Amenity>> GetAllAsync();
        Task<Amenity?> GetByIdAsync(int id);
        Task<int> CreateAsync(Amenity amenity);
        Task<bool> DeleteAsync(int id);
    }
}
