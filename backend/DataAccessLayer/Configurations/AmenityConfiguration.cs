using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Entities;

namespace Persistence.Configurations
{
	public class AmenityConfiguration : IEntityTypeConfiguration<AmenityEntity>
	{
		public void Configure(EntityTypeBuilder<AmenityEntity> builder)
		{
			builder.ToTable("Amenities");
			builder.HasKey(a => a.Id);
			builder.Property(a => a.Name).IsRequired().HasMaxLength(100);
		}
	}
}
