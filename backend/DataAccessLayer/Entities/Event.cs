using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Entities
{
	public class Event
	{
		public Guid Id { get; set; }


		public string Title { get; set; } = string.Empty;


		public string Description { get; set; } = string.Empty;

		public DateTime Start { get; set; }

		public DateTime? End { get; set; }


		public string Location { get; set; } = string.Empty;

		public int? Capacity { get; set; } 

		[Required]
		public bool IsPublic { get; set; } 


		[Required]
		public Guid OrganizerId { get; set; }


		[ForeignKey("OrganizerId")]
		public User Organizer { get; set; } = null!;

		public ICollection<EventParticipant> Participants { get; set; } = new List<EventParticipant>();

		public ICollection<EventTag> EventTags { get; set; } = new List<EventTag>();
	}
}
