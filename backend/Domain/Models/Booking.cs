

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
		public string Status { get; }
		public DateTime CreatedAt { get; }

		private Booking(Guid id, Guid userId, Guid workspaceId, Guid aviabilityId, DateTime start, DateTime end, string status, DateTime createdAt)
		{
			Id = id;
			UserId = userId;
			WorkspaceId = workspaceId;
			AviabilityId = aviabilityId;
			Start = start;
			End = end;
			Status = status;
			CreatedAt = createdAt;
		}


		public static (Booking? booking, string? error) Create(
			Guid userId,
			Guid workspaceId,
			Guid aviabilityId,
			DateTime start,
			DateTime end
		)
		{
			if (start >= end)
				return (null, "End date must be after start date");

			var booking = new Booking(
				Guid.NewGuid(),
				userId,
				workspaceId,
				aviabilityId,
				start,
				end,
				"Pending",
				DateTime.UtcNow // авто-генерация даты
			);

			return (booking, null);
		}
		public static (Booking? booking, string? error) Create(
	Guid userId,
	Guid workspaceId,
	Guid aviabilityId,
	DateTime start,
	DateTime end,
	string status,
	DateTime createdAt
)
		{
			if (start >= end)
				return (null, "End date must be after start date");

			var booking = new Booking(
				Guid.NewGuid(),
				userId,
				workspaceId,
				aviabilityId,
				start,
				end,
				status,
				createdAt
			);

			return (booking, null);
		}

	}
}
