using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Entities;


namespace Persistence.Configurations
{
	public class AviabilityConfiguration : IEntityTypeConfiguration<AviabilityEntity>
	{
		public void Configure(EntityTypeBuilder<AviabilityEntity> builder)
		{
			builder.ToTable("Aviabilities");

			builder.HasKey(a => a.Id);

			builder.Property(a => a.Quantity)
				.IsRequired();

			builder.Property(a => a.CapacityOption)
				.IsRequired();

			builder.HasOne(a => a.Workspace)
				.WithMany(w => w.Aviabilities)
				.HasForeignKey(a => a.WorkspaceId);
		}
	}
}
