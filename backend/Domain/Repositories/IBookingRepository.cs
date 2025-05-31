using Domain.Models;


namespace Domain.Repositories
{
    public interface IBookingRepository
    {
        Task<Booking?> GetByIdAsync(Guid id);
        Task<List<Booking>> GetByUserAsync(Guid userId);
        Task<Guid> CreateAsync(Booking booking);
        Task<bool> DeleteAsync(Guid id);
    }
}
