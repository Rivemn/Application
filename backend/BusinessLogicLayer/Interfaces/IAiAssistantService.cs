using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos.AI;


namespace BusinessLogicLayer.Interfaces
{
	public interface IAiAssistantService
	{
		Task<Result<AiResponseDto>> GetAnswerAsync(AiQueryDto query);
	}
}
