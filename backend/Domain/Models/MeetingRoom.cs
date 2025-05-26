using Domain.Abstractions;
using Domain.Enums;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class MeetingRoom : Workspace, ICapacitySupport
	{
		private MeetingRoom(Guid id, string name, DateTime createdAt)
			: base(id, name, createdAt)
		{
			CapacityOptions = new List<CapacityOption>();
		}

		public override WorkspaceKind Kind => WorkspaceKind.MeetingRoom;
		public List<CapacityOption> CapacityOptions { get; }

		public static MeetingRoom Create(Guid id, string name, DateTime createdAt)
		{
			return new MeetingRoom(id, name, createdAt);
		}
	}
}
