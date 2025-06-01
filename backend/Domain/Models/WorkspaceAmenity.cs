namespace Domain.Models
{
	public class WorkspaceAmenity
	{
		public Guid WorkspaceId { get; private set; }
		public int AmenityId { get; private set; }


		private WorkspaceAmenity(Guid workspaceId, int amenityId)
		{
			WorkspaceId = workspaceId;
			AmenityId = amenityId;
		}


		public static (WorkspaceAmenity workspace, string error) Create(Guid workspaceId, int amenityId)
		{

			if (workspaceId == Guid.Empty)
				return (null, "Workspace ID cannot be empty.");

			if (amenityId <= 0)
				return (null, "Amenity ID must be greater than 0.");

			var workspaceAmenity= new WorkspaceAmenity(workspaceId, amenityId);

			return (workspaceAmenity ,string.Empty);
		}
	}
}
