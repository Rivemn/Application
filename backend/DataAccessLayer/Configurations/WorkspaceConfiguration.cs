
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Entities;

namespace Persistence.Configurations
{
	public class WorkspaceConfiguration : IEntityTypeConfiguration<WorkspaceEntity>
	{
		public void Configure(EntityTypeBuilder<WorkspaceEntity> builder)
		{
			builder.ToTable("Workspaces");
			builder.HasKey(w => w.Id);
			builder.Property(w => w.Name).IsRequired().HasMaxLength(100);
			builder.Property(w => w.Description).HasMaxLength(500);
			builder.Property(w => w.AvailabilityUnit).IsRequired().HasMaxLength(50);

			builder.HasOne(w => w.Coworking)
	       .WithMany(c => c.Workspaces)
	       .HasForeignKey(w => w.CoworkingId);

			builder.HasMany(w => w.Photos)
	        .WithOne(p => p.Workspace)
	        .HasForeignKey(p => p.WorkspaceId)
	        .OnDelete(DeleteBehavior.Restrict);
		}
	}
}
