using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Entities
{
	public class AmenityEntity
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public ICollection<WorkspaceAmenityEntity> WorkspaceAmenities { get; set; } = new List<WorkspaceAmenityEntity>();
	}
}
