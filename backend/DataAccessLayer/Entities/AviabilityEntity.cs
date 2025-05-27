namespace Persistence.Entities
{
	public class AviabilityEntity
	{
		public Guid Id { get; private set; }
		public Guid WorkspaceId { get; set; }
		public int Capacity { get; private set; }
		public int CapacityOption { get; private set; } //1 person or 2 people

		public WorkspaceEntity Workspace { get; set; } = null!;
	}
}
