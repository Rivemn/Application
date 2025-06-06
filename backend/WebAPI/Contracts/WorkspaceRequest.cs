namespace WebAPI.Contracts
{
	public record WorkspaceRequest
	(
		string Name,
		string Description,
		string AvailabilityUnit
	);
}
