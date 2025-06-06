

namespace Persistence.Entities
{
	public class UserEntity
	{
		public Guid Id { get; set; }
		public string FullName { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		public DateTime CreatedAt { get; set; }

		public ICollection<BookingEntity> Bookings { get; set; } = new List<BookingEntity>();
	}
}
