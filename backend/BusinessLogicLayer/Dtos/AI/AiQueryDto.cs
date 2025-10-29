using BusinessLogicLayer.Dtos.Event;


namespace BusinessLogicLayer.Dtos.AI
{
	public class AiQueryDto
	{
		public string Question { get; set; } = string.Empty;
		public List<EventDto> Events { get; set; } = new();
		public List<TagDto> Tags { get; set; } = new();
	}
}
