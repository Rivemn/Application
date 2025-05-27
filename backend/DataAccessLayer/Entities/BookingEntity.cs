

namespace Persistence.Entities
{
	public class BookingEntity
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public Guid WorkspaceId { get; set; }
		public DateTime Start { get; set; }
		public DateTime End { get; set; }
		public int Quantity { get; set; }
		public Guid? CapacityOptionId { get; set; }
		public string Status { get; set; } = string.Empty;
		public DateTime CreatedAt { get; set; }
	}
}
