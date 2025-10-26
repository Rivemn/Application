
namespace BusinessLogicLayer.Dtos
{

	public class CreateEventDto
	{
		public string Title { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public DateTime Start { get; set; }
		public DateTime? End { get; set; }

		public string Location { get; set; } = string.Empty;
		public int? Capacity { get; set; }
		public bool IsPublic { get; set; } = true;

		public List<string> TagNames { get; set; } = new();
	}
}
