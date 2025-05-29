
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeetingRoomBooking.Core.Models
{
    public class Booking
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public Guid WorkspaceId { get; private set; }
        public DateTime Start { get; private set; }
        public DateTime End { get; private set; }
        public int Quantity { get; private set; }
        public Guid? CapacityOptionId { get; private set; }
        public string Status { get; private set; }
        public DateTime CreatedAt { get; private set; }

        private Booking(Guid id, Guid userId, Guid workspaceId, DateTime start, DateTime end, int quantity, Guid? capacityOptionId, string status, DateTime createdAt)
        {
            Id = id;
            UserId = userId;
            WorkspaceId = workspaceId;
            Start = start;
            End = end;
            Quantity = quantity;
            CapacityOptionId = capacityOptionId;
            Status = status;
            CreatedAt = createdAt;
        }

        public static (Booking? booking, string error) Create(Guid userId, Guid workspaceId, DateTime start, DateTime end, int quantity, Guid? capacityOptionId, string status, DateTime createdAt)
        {
            if (start >= end)
                return (null, "Start time must be before end time");

            if (quantity <= 0)
                return (null, "Quantity must be greater than 0");

            var booking = new Booking(
                Guid.NewGuid(),
                userId,
                workspaceId,
                start,
                end,
                quantity,
                capacityOptionId,
                status,
                createdAt
            );

            return (booking, string.Empty);
        }
    }
}
