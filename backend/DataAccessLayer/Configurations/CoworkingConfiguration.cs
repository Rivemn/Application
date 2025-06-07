using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Entities;

namespace Persistence.Configurations
{
	public class CoworkingConfiguration : IEntityTypeConfiguration<CoworkingEntity>
	{
		public void Configure(EntityTypeBuilder<CoworkingEntity> builder)
		{
			builder.ToTable("Coworkings");
			builder.HasKey(c => c.Id);
			builder.Property(c => c.Name).IsRequired().HasMaxLength(100);
			builder.Property(c => c.Address).IsRequired().HasMaxLength(200);

			builder.HasMany(c => c.Workspaces)
				.WithOne()
				.HasForeignKey("CoworkingId")
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}