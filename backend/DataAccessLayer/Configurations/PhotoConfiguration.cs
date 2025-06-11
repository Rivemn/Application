using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Entities;

namespace Persistence.Configurations
{
	public class PhotoConfiguration : IEntityTypeConfiguration<PhotoEntity>
	{
		public void Configure(EntityTypeBuilder<PhotoEntity> builder)
		{
			builder.ToTable("Photo");

			builder.HasKey(a => a.Id);

			builder.Property(a => a.Url)
				.IsRequired()
				.HasMaxLength(100);

			builder.HasOne(p => p.Workspace)
				.WithMany(w => w.Photos)
				.HasForeignKey(p => p.WorkspaceId)
				.OnDelete(DeleteBehavior.Restrict);

			builder.HasOne(p => p.Coworking)
		   .WithMany()
		   .HasForeignKey(p => p.CoworkingId)
		   .OnDelete(DeleteBehavior.Restrict);
		}
	}
}
