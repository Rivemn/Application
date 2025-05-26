using Domain.Abstractions;
using Domain.Enums;
using Domain.Interfaces;


namespace Domain.Models
{
	public class PrivateRoom : Workspace, ICapacitySupport
	{
		private PrivateRoom(Guid id, string name, DateTime createdAt)
			: base(id, name, createdAt)
		{
			CapacityOptions = new List<CapacityOption>();
		}

		public override WorkspaceKind Kind => WorkspaceKind.PrivateRoom;
		public List<CapacityOption> CapacityOptions { get; }

		public static PrivateRoom Create(Guid id, string name, DateTime createdAt)
		{
			return new PrivateRoom(id, name, createdAt);
		}
	}
}
