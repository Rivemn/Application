namespace WebAPI.Contracts
{
	public record PhotoRequest
	(
		string url,
		Guid workspaceId
	);
}
