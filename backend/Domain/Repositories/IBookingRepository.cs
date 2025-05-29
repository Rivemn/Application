using MeetingRoomBooking.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
