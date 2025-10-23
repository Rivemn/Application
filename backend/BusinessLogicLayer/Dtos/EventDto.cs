namespace BusinessLogicLayer.Dtos
{
	public class EventDto
	{
		public Guid Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public DateTime Start { get; set; }
		public DateTime? End { get; set; }

		public string Location { get; set; } = string.Empty;

		public int? Capacity { get; set; }

		public bool IsPublic { get; set; }

		public int ParticipantsCount { get; set; }

		public Guid OrganizerId { get; set; }
		public string OrganizerName { get; set; } = string.Empty;

		public List<string> ParticipantIds { get; set; } = new();
	}
}
