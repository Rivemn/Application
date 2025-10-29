using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
	public class Tag
	{
		public Guid Id { get; set; }

		[Required]
		[MaxLength(50)] 
		public string Name { get; set; } = string.Empty;

		public ICollection<EventTag> EventTags { get; set; } = new List<EventTag>();
	}
}
