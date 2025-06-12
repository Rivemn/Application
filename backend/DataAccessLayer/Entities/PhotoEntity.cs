namespace Persistence.Entities
{
	public class PhotoEntity
	{
		public int Id { get; set; }
		public string Url { get; set; } = string.Empty;

		public Guid? WorkspaceId { get; set; }
		public WorkspaceEntity? Workspace { get; set; } 

		public Guid? CoworkingId { get; set; }
		public CoworkingEntity? Coworking { get; set; }
	}
}
