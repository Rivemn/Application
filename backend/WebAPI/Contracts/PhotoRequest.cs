namespace WebAPI.Contracts
{
	public record PhotoRequest
	(
		string Url,
		Guid WorkspaceId
	);
}
