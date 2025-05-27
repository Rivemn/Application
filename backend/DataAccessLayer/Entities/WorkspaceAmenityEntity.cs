namespace Persistence.Entities
{
	public class WorkspaceAmenityEntity
	{
		public Guid WorkspaceId { get; set; }
		public int AmenityId { get; set; }

		public WorkspaceEntity Workspace { get; set; } = null!;
		public AmenityEntity Amenity { get; set; } = null!;
	}
}
