using Domain.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Entities;

namespace Persistence.Repositories
{
	public class UserRepository : IUserRepository
	{
		private readonly AppDbContext _context;

		public UserRepository(AppDbContext context)
		{
			_context = context;
		}

		public async Task<User?> GetByEmailAsync(string email)
		{
			var entity = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
			if (entity == null) return null;

			return User.Create(entity.Id, entity.FullName, entity.Email, entity.CreatedAt);
		}

		public async Task<Guid> CreateAsync(User user)
		{
			var entity = new UserEntity
			{
				Id = user.Id,
				FullName = user.FullName,
				Email = user.Email,
				CreatedAt = user.CreatedAt
			};

			_context.Users.Add(entity);
			await _context.SaveChangesAsync();
			return entity.Id;
		}
		public async Task<List<Booking>> GetBookingsByEmailAsync(string email)
		{
			var user = await _context.Users
				.Include(u => u.Bookings)
				.FirstOrDefaultAsync(u => u.Email == email);

			if (user == null || user.Bookings == null)
				return new List<Booking>();

			var result = new List<Booking>();

			foreach (var entity in user.Bookings)
			{
				var (booking, error) = Booking.Create(
					entity.Id,
					entity.UserId,
					entity.WorkspaceId,
					entity.AvailabilityId,
					entity.Start,
					entity.End,
					entity.Status,
					entity.CreatedAt
				);

				if (booking != null)
					result.Add(booking);
				else
					Console.WriteLine($"Invalid booking skipped: {error}"); 
			}

			return result;
		}


	}
}
