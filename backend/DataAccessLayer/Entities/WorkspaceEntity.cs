

namespace Persistence.Entities
{
	public class WorkspaceEntity
	{
		public Guid Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public string AviabilityUnit { get; set; } = string.Empty;

		public ICollection<AviabilityEntity> Aviabilities { get; set; } = new List<AviabilityEntity>();
		public ICollection<WorkspaceAmenityEntity> WorkspaceAmenities { get; set; } = new List<WorkspaceAmenityEntity>();
	}
}
