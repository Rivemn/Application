namespace Domain.Models;

public class Photo
{
	public int Id { get; private set; }
	public string Url { get; private set; }
	public Guid? WorkspaceId { get; private set; }
	public Guid? CoworkingId { get; private set; }

	private Photo(int id, string url, Guid? workspaceId, Guid? coworkingId)
	{
		Id = id;
		Url = url;
		WorkspaceId = workspaceId;
		CoworkingId = coworkingId;
	}

	public static (Photo? photo, string error) Create(int id, string url, Guid? workspaceId, Guid? coworkingId)
	{
		if (string.IsNullOrWhiteSpace(url))
			return (null, "URL cannot be empty");

		var photo = new Photo(id, url.Trim(), workspaceId,coworkingId);
		return (photo, string.Empty);
	}
}
