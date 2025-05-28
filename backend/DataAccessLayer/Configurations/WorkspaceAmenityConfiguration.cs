using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Entities;


namespace Persistence.Configurations
{
	public class WorkspaceAmenityConfiguration : IEntityTypeConfiguration<WorkspaceAmenityEntity>
	{
		public void Configure(EntityTypeBuilder<WorkspaceAmenityEntity> builder)
		{
			builder.ToTable("WorkspaceAmenities");
			builder.HasKey(wa => new { wa.WorkspaceId, wa.AmenityId });
			builder.HasOne(wa => wa.Workspace).WithMany(w => w.WorkspaceAmenities).HasForeignKey(wa => wa.WorkspaceId);
			builder.HasOne(wa => wa.Amenity).WithMany(a => a.WorkspaceAmenities).HasForeignKey(wa => wa.AmenityId);
		}
	}
}
