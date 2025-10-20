
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Entities
{
	public class User
	{
		public Guid Id { get; set; }


		public string Email { get; set; } = string.Empty;

		public string FullName { get; set; } = string.Empty;

		public string PasswordHash { get; set; } = string.Empty;

		public ICollection<Event> OrganizedEvents { get; set; } = new List<Event>();

		public ICollection<EventParticipant> EventParticipations { get; set; } = new List<EventParticipant>();
	}
}
