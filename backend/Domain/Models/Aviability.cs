
namespace Domain.Models
{
	public class Aviability
	{
		public Guid WorkspaceId { get; }
		public int Capacity { get; private set; }
		public int CapacityOption { get; private set; } //1 person or 2 people


		public Workspace Workspace { get; private set; }

		public Aviability(Guid id, Workspace workspace, int totalDesks, int capacityOption)
		{
			Workspace = workspace;
			WorkspaceId = workspace.Id;
			Capacity = totalDesks;
			CapacityOption = capacityOption;
		}
	}
}
