using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Interfaces
{
	public interface ITagService
	{
		Task<IEnumerable<TagDto>> GetAllTagsAsync();
		Task<Result<TagDto>> CreateTagAsync(string name);
	}
}
