using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Entities
{
	public class EventParticipant
	{
		public Guid UserId { get; set; }

		public Guid EventId { get; set; }

		public User User { get; set; } = null!;
		public Event Event { get; set; } = null!;
	}
}
