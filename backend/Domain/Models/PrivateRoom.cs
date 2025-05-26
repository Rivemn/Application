using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class PrivateRoom : Workspace
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
