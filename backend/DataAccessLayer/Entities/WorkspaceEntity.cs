

namespace Persistence.Entities
{
	public class WorkspaceEntity
	{
		public Guid Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public string AvailabilityUnit { get; set; } = string.Empty;

		public ICollection<PhotoEntity> Photos { get; set; } = new List<PhotoEntity>();
		public ICollection<AvailabilityEntity> Availabilities { get; set; } = new List<AvailabilityEntity>();
		public ICollection<WorkspaceAmenityEntity> WorkspaceAmenities { get; set; } = new List<WorkspaceAmenityEntity>();
	}
}
