namespace WebAPI.Contracts
{
    public record BookingRequest
    (
		 string fullName,
		 string email,      
		 Guid workspaceId,
         DateTime start,
         DateTime end,
         int quantity,
         Guid? capacityOptionId
    );
}
