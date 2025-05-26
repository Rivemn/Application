using Domain.Models;

namespace Domain.Interfaces
{
	internal interface ICapacitySupport
	{
		List<CapacityOption> CapacityOptions { get; }
	}
}
