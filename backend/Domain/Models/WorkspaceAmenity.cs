namespace Domain.Models
{
	public class WorkspaceAmenity
	{
		public Guid WorkspaceId { get; private set; }
		public int AmenityId { get; private set; }

		public WorkspaceAmenity(Guid workspaceId, int amenityId)
		{
			WorkspaceId = workspaceId;
			AmenityId = amenityId;
		}
	}
}