using Domain.Repositories;
using Domain.Services;
using MeetingRoomBooking.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _repository;

        public BookingService(IBookingRepository repository)
        {
            _repository = repository;
        }

        public async Task<(Guid id, string error)> CreateAsync(Guid userId, Guid workspaceId, DateTime start, DateTime end, int quantity, Guid? capacityOptionId)
        {
            var (booking, error) = Booking.Create(userId, workspaceId, start, end, quantity, capacityOptionId,"Pending",DateTime.Now);
            if (!string.IsNullOrEmpty(error))
                return (Guid.Empty, error);

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
            var success = await _repository.DeleteAsync(id);
            return success ? (true, string.Empty) : (false, "Booking not found");
        }
    }

}
