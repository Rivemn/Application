using Domain.Abstractions;

namespace Domain.Models
{
	public class CapacityOption
	{
		public int Value { get; } // например, 5 человек
		public Guid WorkspaceId { get; }
		public Workspace Workspace { get; }

		private CapacityOption(Guid workspaceId, int value)
		{
			WorkspaceId = workspaceId;
			Value = value;
		}

		public static CapacityOption Create(Guid workspaceId, int value)
		{
            return new CapacityOption(workspaceId, value);
		}		 
	}
}
