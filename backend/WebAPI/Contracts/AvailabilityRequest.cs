namespace WebAPI.Contracts
{
    public record AvailabilityRequest
    (
        Guid WorkspaceId,
        int Quantity,
         int CapacityOption 
    );
}
