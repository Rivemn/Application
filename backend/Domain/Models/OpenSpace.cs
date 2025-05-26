using Domain.Abstractions;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
	public class OpenSpace : Workspace
	{
		private OpenSpace(Guid id, string name, int totalDesks, DateTime createdAt)
			: base(id, name, createdAt)
		{
			TotalDesks = totalDesks;
		}

		public override WorkspaceKind Kind => WorkspaceKind.OpenSpace;
		public int TotalDesks { get; }

		public static OpenSpace Create(Guid id, string name, int totalDesks, DateTime createdAt)
		{
			return new OpenSpace(id, name, totalDesks, createdAt);
		}
	}
}
