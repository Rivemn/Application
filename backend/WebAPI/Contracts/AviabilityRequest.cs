namespace WebAPI.Contracts
{
    public record AviabilityRequest
    (
        Guid WorkspaceId,
        int Quantity,
         int CapacityOption 
    );
}
