using Domain.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Entities;


namespace Persistence.Repositories
{
        public class BookingRepository : IBookingRepository
        {
            private readonly AppDbContext _context;

            public BookingRepository(AppDbContext context)
            {
                _context = context;
            }

		public async Task<Booking?> GetByIdAsync(Guid id)
		{
			var entity = await _context.Bookings.FindAsync(id);
			if (entity == null)
				return null;

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

			return booking;
		}


		public async Task<List<Booking>> GetByUserAsync(Guid userId)
		{
			var entities = await _context.Bookings
				.Where(b => b.UserId == userId)
				.ToListAsync();

			var bookings = new List<Booking>();

			foreach (var entity in entities)
			{
				var (booking, _) = Booking.Create(
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
					bookings.Add(booking);
			}

			return bookings;
		}


		public async Task<Guid> CreateAsync(Booking booking)
		{
			var entity = new BookingEntity
			{
				Id = booking.Id,
				UserId = booking.UserId,
				WorkspaceId = booking.WorkspaceId,
				AvailabilityId = booking.AvailabilityId,
				Start = booking.Start,
				End = booking.End,
				Status = booking.Status,
				CreatedAt = booking.CreatedAt
			};

			_context.Bookings.Add(entity);
			await _context.SaveChangesAsync();

			return entity.Id;
		}


		public async Task<bool> DeleteAsync(Guid id)
            {
                var entity = await _context.Bookings.FindAsync(id);
                if (entity == null) return false;

                _context.Bookings.Remove(entity);
                await _context.SaveChangesAsync();
                return true;
            }


	}


}
