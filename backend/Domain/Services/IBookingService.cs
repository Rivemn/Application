using Domain.Models;

namespace Domain.Services
{
    public interface IBookingService
    {
        Task<(Guid id, string error)> CreateAsync(string fullName, string email, Guid workspaceId, DateTime start, DateTime end, Guid aviabilityId);
		Task<(Booking? booking, string error)> GetByIdAsync(Guid id);
        Task<List<Booking>> GetByUserAsync(Guid userId);
        Task<(bool success, string error)> DeleteAsync(Guid id);
    }

}
