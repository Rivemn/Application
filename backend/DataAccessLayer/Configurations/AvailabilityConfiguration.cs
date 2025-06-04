using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Entities;


namespace Persistence.Configurations
{
	public class AvailabilityConfiguration : IEntityTypeConfiguration<AvailabilityEntity>
	{
		public void Configure(EntityTypeBuilder<AvailabilityEntity> builder)
		{
			builder.ToTable("Availabilities");

			builder.HasKey(a => a.Id);

			builder.Property(a => a.Quantity)
				.IsRequired();

			builder.Property(a => a.CapacityOption)
				.IsRequired();

			builder.HasOne(a => a.Workspace)
				.WithMany(w => w.Availabilities)
				.HasForeignKey(a => a.WorkspaceId);
		}
	}
}
