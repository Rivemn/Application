namespace Persistence.Entities
{
	public class AvailabilityEntity
	{
		public Guid Id { get;  set; }
		public Guid WorkspaceId { get; set; }
		public int Quantity { get;  set; }
		public int CapacityOption { get;  set; } //1 person or 2 people

		public WorkspaceEntity Workspace { get; set; } = null!;
		public ICollection<BookingEntity> Bookings { get; set; } = new List<BookingEntity>();
	}
}
