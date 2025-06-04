
namespace Domain.Models
{
	public class Availability
	{
		public Guid Id { get; set; }
		public Guid WorkspaceId { get; private set; }
		public int Quantity { get; private set; }
        public int CapacityOption { get; private set; }



		private Availability(Guid id, Workspace workspace, int quantity, int capacityOption)
		{
			Id = id;
			WorkspaceId = workspace.Id;
			Quantity = quantity;
			CapacityOption = capacityOption;
		}

		public static (Availability? aviability, string error) Create(Guid Id,Workspace workspace, int capacity, int capacityOption)
		{
			if (workspace == null)
				return (null, "Workspace cannot be null");

			if (capacity <= 0)
				return (null, "Quantity must be greater than 0");


			var aviability = new Availability(Id,workspace, capacity, capacityOption);
			return (aviability, string.Empty);
		}
	}
}
