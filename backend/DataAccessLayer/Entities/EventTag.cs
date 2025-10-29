using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
	public class EventTag
	{
		public Guid EventId { get; set; }
		public Event Event { get; set; } = null!;

		public Guid TagId { get; set; }
		public Tag Tag { get; set; } = null!;
	}
}
