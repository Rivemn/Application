
namespace Domain.Models
{
	public class Aviability
	{
        public Guid WorkspaceId { get; private set; }
		public int Capacity { get; private set; }
        public int CapacityOption { get; private set; } // 1 person or 2 people
		public Workspace Workspace { get; private set; }

        private Aviability(Workspace workspace, int capacity, int capacityOption)
		{
			Workspace = workspace;
			WorkspaceId = workspace.Id;
            Capacity = capacity;
			CapacityOption = capacityOption;
		}

        public static (Aviability? aviability, string error) Create(Workspace workspace, int capacity, int capacityOption)
        {
            if (workspace == null)
                return (null, "Workspace cannot be null");

            if (capacity <= 0)
                return (null, "Capacity must be greater than 0");


            var aviability = new Aviability(workspace, capacity, capacityOption);
            return (aviability, string.Empty);
        }
	}
}
