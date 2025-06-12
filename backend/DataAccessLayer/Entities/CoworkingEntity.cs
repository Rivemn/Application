

namespace Persistence.Entities
{
	public class CoworkingEntity
	{
		public Guid Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public string Address { get; set; } = string.Empty;

		public ICollection<WorkspaceEntity> Workspaces { get; set; } = new List<WorkspaceEntity>();
		public ICollection<PhotoEntity> Photos { get; set; } = new List<PhotoEntity>();
	}
}
