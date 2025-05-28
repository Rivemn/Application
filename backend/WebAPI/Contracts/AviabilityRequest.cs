namespace WebAPI.Contracts
{
    public record AviabilityRequest
    (
        Guid WorkspaceId,
        int Capacity,
         int CapacityOption 
    );
}
