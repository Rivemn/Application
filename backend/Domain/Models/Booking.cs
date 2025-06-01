

namespace Domain.Models
{
	public class Booking
	{
		public Guid Id { get; }
		public Guid UserId { get; }
		public Guid WorkspaceId { get; }
		public Guid AviabilityId { get; }
		public DateTime Start { get; }
		public DateTime End { get; }
		public int Quantity { get; }
		public string Status { get; }
		public DateTime CreatedAt { get; }

		private Booking(Guid id, Guid userId, Guid workspaceId, Guid aviabilityId, DateTime start, DateTime end, int quantity, string status, DateTime createdAt)
		{
			Id = id;
			UserId = userId;
			WorkspaceId = workspaceId;
			AviabilityId = aviabilityId;
			Start = start;
			End = end;
			Quantity = quantity;
			Status = status;
			CreatedAt = createdAt;
		}


		public static (Booking? booking, string? error) Create
			( 
			Guid userId,
			Guid workspaceId,
			DateTime start,DateTime end,
			int quantity,
			Guid aviabilityId,	 
	        DateTime createdAt
			)
		{
			if (start >= end)
				return (null, "End date must be after start date");

			if (quantity <= 0)
				return (null, "Quantity must be greater than 0");

			var booking = new Booking(
				Guid.NewGuid(),
				userId,
				workspaceId,
				aviabilityId,
				start,
				end,
				quantity,
				"Pending",
				createdAt
			);

			return (booking, null);
		}
	}
}
