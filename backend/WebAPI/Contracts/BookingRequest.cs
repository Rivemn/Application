using Domain.Models;

namespace WebAPI.Contracts
{
	public record BookingRequest
	(
		string FullName,
		string Email,
		Guid WorkspaceId,
		DateTime Start,
		DateTime End,
		Guid AvailabilityId
	);
}
