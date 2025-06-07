

namespace Persistence.Entities
{
	public class WorkspaceEntity
	{
		public Guid Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public string AvailabilityUnit { get; set; } = string.Empty;

		public Guid? CoworkingId { get; set; } 

		public CoworkingEntity? Coworking { get; set; }

		public ICollection<PhotoEntity> Photos { get; set; } = new List<PhotoEntity>();
		public ICollection<AvailabilityEntity> Availabilities { get; set; } = new List<AvailabilityEntity>();
		public ICollection<WorkspaceAmenityEntity> WorkspaceAmenities { get; set; } = new List<WorkspaceAmenityEntity>();
	}
}
