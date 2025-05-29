namespace Persistence.Entities
{
	public class AviabilityEntity
	{
		public Guid Id { get;  set; }
		public Guid WorkspaceId { get; set; }
		public int Capacity { get;  set; }
		public int CapacityOption { get;  set; } //1 person or 2 people

		public WorkspaceEntity Workspace { get; set; } = null!;
	}
}
