
using Microsoft.EntityFrameworkCore;
using Persistence.Configurations;
using Persistence.Entities;

namespace Persistence
{
	public class AppDbContext (DbContextOptions<AppDbContext> options) : DbContext(options)
	{
		public DbSet<CoworkingEntity> Coworkings { get; set; }
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

			modelBuilder.ApplyConfiguration(new CoworkingConfiguration());
			modelBuilder.ApplyConfiguration(new WorkspaceConfiguration());
			modelBuilder.ApplyConfiguration(new AvailabilityConfiguration());
			modelBuilder.ApplyConfiguration(new BookingConfiguration());
			modelBuilder.ApplyConfiguration(new UserConfiguration());
			modelBuilder.ApplyConfiguration(new AmenityConfiguration());
			modelBuilder.ApplyConfiguration(new WorkspaceAmenityConfiguration());

			SeedData(modelBuilder);
		}
		private void SeedData(ModelBuilder modelBuilder)
		{

			var coworkings = new List<CoworkingEntity>
			{
				new CoworkingEntity
				{
					Id = Guid.Parse("123e4567-e89b-12d3-a456-426614174000"),
					Name = "Downtown Hub",
					Address = "123 Main St, Cityville"
				},
				new CoworkingEntity
				{
					Id = Guid.Parse("223e4567-e89b-12d3-a456-426614174001"),
					Name = "Tech Park CoWork",
					Address = "456 Tech Rd, Innovate City"
				}
			};
			modelBuilder.Entity<CoworkingEntity>().HasData(coworkings);
			// Amenities
			var amenities = new List<AmenityEntity>
			{
				new AmenityEntity { Id = 1, Name = "wifi" },
				new AmenityEntity { Id = 2, Name = "coffee" },
				new AmenityEntity { Id = 3, Name = "device-gamepad-2" },
				new AmenityEntity { Id = 4, Name = "headphones" },
				new AmenityEntity { Id = 5, Name = "microphone" }
			};
			modelBuilder.Entity<AmenityEntity>().HasData(amenities);


			// Workspaces
			var workspaces = new List<WorkspaceEntity>
			{
				new WorkspaceEntity
				{
					Id = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181"),
					Name = "Private Office",
					Description = "Quiet space for focused work",
					AvailabilityUnit = "room",
					CoworkingId = Guid.Parse("123e4567-e89b-12d3-a456-426614174000")
				},
				new WorkspaceEntity
				{
					Id = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819"),
					Name = "Meeting Room",
					Description = "Space for team meetings",
					AvailabilityUnit = "room",
					CoworkingId = Guid.Parse("123e4567-e89b-12d3-a456-426614174000")
				},
				new WorkspaceEntity
				{
					Id = Guid.Parse("d3e4f5c6-7891-0111-2131-415161718192"),
					Name = "Open Desk",
					Description = "Shared desk space",
					AvailabilityUnit = "desk",
					CoworkingId = Guid.Parse("223e4567-e89b-12d3-a456-426614174001")
				}
			};
			modelBuilder.Entity<WorkspaceEntity>().HasData(workspaces);

			// Photos
			var photos = new List<PhotoEntity>
			{
				new PhotoEntity { Id = 1, Url = "photos/OpenSpace/main-photo.png", WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181") },
				new PhotoEntity { Id = 2, Url = "photos/OpenSpace/image1.png", WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181") },
				new PhotoEntity { Id = 3, Url = "photos/OpenSpace/image2.png", WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181") },
				new PhotoEntity { Id = 4, Url = "photos/OpenSpace/image3.png", WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181") },
				new PhotoEntity { Id = 5, Url = "photos/MeetingRoom/main-photo.png", WorkspaceId = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819") }
			};
			modelBuilder.Entity<PhotoEntity>().HasData(photos);

			// Availabilities
			var availabilities = new List<AvailabilityEntity>
			{
				new AvailabilityEntity
				{
					Id = Guid.Parse("d3c4b5a6-7891-0111-2131-415161718192"),
					WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181"),
					Quantity = 5,
					CapacityOption = 1
				},
				new AvailabilityEntity
				{
					Id = Guid.Parse("c4b5a6b7-8910-1112-1314-151617181920"),
					WorkspaceId = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819"),
					Quantity = 2,
					CapacityOption = 4
				}
			};
			modelBuilder.Entity<AvailabilityEntity>().HasData(availabilities);

			
			var workspaceAmenities = new List<WorkspaceAmenityEntity>
			{
				new WorkspaceAmenityEntity { WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181"), AmenityId = 1 }, // Private Office - Wi-Fi
                new WorkspaceAmenityEntity { WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181"), AmenityId = 2 }, // Private Office - Coffee
                new WorkspaceAmenityEntity { WorkspaceId = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819"), AmenityId = 1 }, // Meeting Room - Wi-Fi
                new WorkspaceAmenityEntity { WorkspaceId = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819"), AmenityId = 4 }  // Meeting Room - Whiteboard
            };
			modelBuilder.Entity<WorkspaceAmenityEntity>().HasData(workspaceAmenities);


		}
	}
}
