using Domain.Models;
using Domain.Repositories;
using Domain.Services;
using Persistence.Repositories;


namespace Application.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _repository;
		private readonly IUserService _userService;

		private readonly IAviabilityRepository _aviabilityRepository;

		public BookingService(IBookingRepository repository, IUserService userService, IAviabilityRepository aviabilityRepository)
		{
			_repository = repository;
			_userService = userService;
			_aviabilityRepository = aviabilityRepository;
		}

		public async Task<(Guid id, string error)> CreateAsync(
					string fullName,
					string email,
					Guid workspaceId,
					DateTime start,
					DateTime end,
					Guid availabilityId)
		{
			// Get or create user
			var userId = await _userService.GetOrCreateUserAsync(fullName, email);

			// Check for conflicting bookings
			var conflictingBookings = await _repository.GetConflictingBookingsAsync(
				workspaceId,
				availabilityId,
				start,
				end);

			if (conflictingBookings.Any())
			{
				return (Guid.Empty, "The selected time slot is already booked for this workspace and availability.");
			}

			// Validate booking creation
			var (booking, error) = Booking.Create(
				Guid.NewGuid(),
				userId,
				workspaceId,
				availabilityId,
				start,
				end,
				"Pending",
				DateTime.UtcNow);

			if (!string.IsNullOrEmpty(error))
				return (Guid.Empty, error);

			// Create booking
			var id = await _repository.CreateAsync(booking);
			return (id, string.Empty);
		}


		public async Task<(Booking? booking, string error)> GetByIdAsync(Guid id)
        {
            var booking = await _repository.GetByIdAsync(id);
            if (booking == null)
                return (null, "Booking not found");

            return (booking, string.Empty);
        }

        public async Task<List<Booking>> GetByUserAsync(Guid userId)
        {
            return await _repository.GetByUserAsync(userId);
        }

		public async Task<(bool success, string error)> DeleteAsync(Guid id)
		{
			var booking = await _repository.GetByIdAsync(id);
			if (booking == null)
				return (false, "Booking not found");

			// Удаляем бронь
			var success = await _repository.DeleteAsync(id);
			if (!success)
				return (false, "Failed to delete booking");

			if (booking.Status == "InProgress")
			{
				await _aviabilityRepository.IncreaseQuantityAsync(booking.AvailabilityId);
			}

			return (true, string.Empty);
		}

	}
}
