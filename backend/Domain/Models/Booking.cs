using Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeetingRoomBooking.Core.Models
{
	public class Booking
	{
		private Booking(Guid id, Guid userId, Guid workspaceId, DateTime start, DateTime end, int quantity, Guid? capacityOptionId, BookingStatus status, DateTime createdAt)
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

		public Guid Id { get; }
		public Guid UserId { get; }
		public Guid WorkspaceId { get; }
		public DateTime Start { get; }
		public DateTime End { get; }
		public int Quantity { get; }
		public Guid? CapacityOptionId { get; } // null = open space
		public BookingStatus Status { get; }
		public DateTime CreatedAt { get; }

		public static Booking Create(Guid id, Guid userId, Guid workspaceId, DateTime start, DateTime end, int quantity, Guid? capacityOptionId, BookingStatus status, DateTime createdAt)
		{
			return new Booking(id, userId, workspaceId, start, end, quantity, capacityOptionId, status, createdAt);
		}
	}
}
