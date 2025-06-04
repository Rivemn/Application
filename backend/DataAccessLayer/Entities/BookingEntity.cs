namespace Persistence.Entities
{
	public class BookingEntity
	{
		public Guid Id { get; set; }

		public Guid UserId { get; set; }
		public UserEntity User { get; set; } = null!;

		public Guid WorkspaceId { get; set; }
		public WorkspaceEntity Workspace { get; set; } = null!;

		public Guid AvailabilityId { get; set; }
		public AvailabilityEntity Availability { get; set; } = null!;

		public DateTime Start { get; set; }
		public DateTime End { get; set; }

		public string Status { get; set; } = string.Empty;
		public DateTime CreatedAt { get; set; }
	}
}
