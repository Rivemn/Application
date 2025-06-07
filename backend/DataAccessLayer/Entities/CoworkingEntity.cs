

namespace Persistence.Entities
{
	public class CoworkingEntity
	{
		public Guid Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Address { get; set; } = string.Empty;

		public ICollection<WorkspaceEntity> Workspaces { get; set; } = new List<WorkspaceEntity>();
	}
}
