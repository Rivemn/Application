
using Microsoft.EntityFrameworkCore;
using Persistence.Configurations;
using Persistence.Entities;

namespace Persistence
{
	public class AppDbContext (DbContextOptions<AppDbContext> options) : DbContext(options)
	{
		public DbSet<WorkspaceEntity> Workspaces { get; set; }
		public DbSet<PhotoEntity> Photos { get; set; }
		public DbSet<AvailabilityEntity> Aviabilities { get; set; }
		public DbSet<UserEntity> Users { get; set; }
		public DbSet<BookingEntity> Bookings { get; set; }

		public DbSet<WorkspaceAmenityEntity> WorkspaceAmenities { get; set; }
		public DbSet<AmenityEntity> Amenities { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.ApplyConfiguration(new WorkspaceConfiguration());
			modelBuilder.ApplyConfiguration(new AvailabilityConfiguration());
			modelBuilder.ApplyConfiguration(new BookingConfiguration());
			modelBuilder.ApplyConfiguration(new UserConfiguration());
			modelBuilder.ApplyConfiguration(new AmenityConfiguration());
			modelBuilder.ApplyConfiguration(new WorkspaceAmenityConfiguration());
		}
	}
}

