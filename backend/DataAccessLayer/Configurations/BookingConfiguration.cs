using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Entities;


namespace Persistence.Configurations
{
	public class BookingConfiguration : IEntityTypeConfiguration<BookingEntity>
	{
		public void Configure(EntityTypeBuilder<BookingEntity> builder)
		{
			builder.ToTable("Bookings");
			builder.HasKey(b => b.Id);
			builder.Property(b => b.Status).IsRequired().HasMaxLength(50);
		}
	}
}
