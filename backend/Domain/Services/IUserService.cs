using Domain.Models;

namespace Domain.Services
{
	public interface IUserService
	{
		Task<Guid> GetOrCreateUserAsync(string fullName, string email);
		Task<List<Booking>> GetBookingsByEmailAsync(string email);
	}
}
