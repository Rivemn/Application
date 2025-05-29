namespace WebAPI.Contracts
{
    public record BookingRequest
    (
        Guid userId,
         Guid workspaceId,
         DateTime start,
         DateTime end,
         int quantity,
         Guid? capacityOptionId 
    );
}
