
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
			builder.Property(w => w.AviabilityUnit).IsRequired().HasMaxLength(50);
		}
	}
}
