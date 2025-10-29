using BusinessLogicLayer.Dtos.Event;

namespace BusinessLogicLayer.Dtos.AI
{
	public class AiSimpleQueryDto
	{
		public string Question { get; set; } = string.Empty;

		public List<Guid>? TagIds { get; set; }
	}
}
