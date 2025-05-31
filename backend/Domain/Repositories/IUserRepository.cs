using MeetingRoomBooking.Core.Models;


namespace Domain.Repositories
{
	public interface IUserRepository
	{
		Task<User?> GetByEmailAsync(string email);
		Task<Guid> CreateAsync(User user);
	}
}
