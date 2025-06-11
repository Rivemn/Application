using Microsoft.EntityFrameworkCore;
using Persistence.Configurations;
using Persistence.Entities;

namespace Persistence
{
	public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
	{
		public DbSet<CoworkingEntity> Coworkings { get; set; }
		public DbSet<WorkspaceEntity> Workspaces { get; set; }
		public DbSet<PhotoEntity> Photos { get; set; }
		public DbSet<AvailabilityEntity> Availabilities { get; set; }
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
					Address = "123 Main St, Cityville",
					Description = "A modern coworking space in the heart of the city."
				},
				new CoworkingEntity
				{
					Id = Guid.Parse("223e4567-e89b-12d3-a456-426614174001"),
					Name = "Tech Park CoWork",
					Address = "456 Tech Rd, Innovate City",
					Description = "Tech-focused coworking space with cutting-edge amenities."
				}
			};
			modelBuilder.Entity<CoworkingEntity>().HasData(coworkings);

			var amenities = new List<AmenityEntity>
			{
				new AmenityEntity { Id = 1, Name = "wifi" },
				new AmenityEntity { Id = 2, Name = "coffee" },
				new AmenityEntity { Id = 3, Name = "device-gamepad-2" },
				new AmenityEntity { Id = 4, Name = "headphones" },
				new AmenityEntity { Id = 5, Name = "microphone" }
			};
			modelBuilder.Entity<AmenityEntity>().HasData(amenities);

			var workspaces = new List<WorkspaceEntity>
			{
				new WorkspaceEntity
				{
					Id = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181"),
					Name = "Private Room",
					Description = "Quiet room for focused work",
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

			var photos = new List<PhotoEntity>
			{
				// Open Desk
				new PhotoEntity { Id = 1, Url = "photos/OpenSpace/main-photo.png", WorkspaceId = Guid.Parse("d3e4f5c6-7891-0111-2131-415161718192") },
				new PhotoEntity { Id = 2, Url = "photos/OpenSpace/image1.png", WorkspaceId = Guid.Parse("d3e4f5c6-7891-0111-2131-415161718192") },
				new PhotoEntity { Id = 3, Url = "photos/OpenSpace/image2.png", WorkspaceId = Guid.Parse("d3e4f5c6-7891-0111-2131-415161718192") },
				new PhotoEntity { Id = 4, Url = "photos/OpenSpace/image3.png", WorkspaceId = Guid.Parse("d3e4f5c6-7891-0111-2131-415161718192") },
				new PhotoEntity { Id = 5, Url = "photos/OpenSpace/image4.png", WorkspaceId = Guid.Parse("d3e4f5c6-7891-0111-2131-415161718192") },

				// Meeting Room
				new PhotoEntity { Id = 6, Url = "photos/MeetingRoom/main-photo.png", WorkspaceId = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819") },
				new PhotoEntity { Id = 7, Url = "photos/MeetingRoom/image1.png", WorkspaceId = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819") },
				new PhotoEntity { Id = 8, Url = "photos/MeetingRoom/image2.png", WorkspaceId = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819") },
				new PhotoEntity { Id = 9, Url = "photos/MeetingRoom/image3.png", WorkspaceId = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819") },
				new PhotoEntity { Id = 17, Url = "photos/MeetingRoom/image4.png", WorkspaceId = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819") },

				// Private Room
				new PhotoEntity { Id = 12, Url = "photos/PrivateRoom/main-photo.png", WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181") },
				new PhotoEntity { Id = 13, Url = "photos/PrivateRoom/image1.png", WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181") },
				new PhotoEntity { Id = 14, Url = "photos/PrivateRoom/image2.png", WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181") },
				new PhotoEntity { Id = 15, Url = "photos/PrivateRoom/image3.png", WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181") },
				new PhotoEntity { Id = 16, Url = "photos/PrivateRoom/image4.png", WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181") },

				// Coworkings
				new PhotoEntity { Id = 10, Url = "photos/Coworkings/urban-space.png", CoworkingId = Guid.Parse("123e4567-e89b-12d3-a456-426614174000") },
				new PhotoEntity { Id = 11, Url = "photos/Coworkings/work-club.png", CoworkingId = Guid.Parse("223e4567-e89b-12d3-a456-426614174001") }
			};
			modelBuilder.Entity<PhotoEntity>().HasData(photos);

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
				},
				new AvailabilityEntity
				{
					Id = Guid.Parse("b5a6c7d8-9120-1122-3344-556677889900"),
					WorkspaceId = Guid.Parse("d3e4f5c6-7891-0111-2131-415161718192"),
					Quantity = 10,
					CapacityOption = 1
				}
			};
			modelBuilder.Entity<AvailabilityEntity>().HasData(availabilities);

			var workspaceAmenities = new List<WorkspaceAmenityEntity>
			{
				// Private Room
				new WorkspaceAmenityEntity { WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181"), AmenityId = 1 },
				new WorkspaceAmenityEntity { WorkspaceId = Guid.Parse("f1e2d3c4-5678-9101-1121-314151617181"), AmenityId = 2 },

				// Meeting Room
				new WorkspaceAmenityEntity { WorkspaceId = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819"), AmenityId = 1 },
				new WorkspaceAmenityEntity { WorkspaceId = Guid.Parse("e2d3c4b5-6789-1011-1213-141516171819"), AmenityId = 4 },

				// Open Desk
				new WorkspaceAmenityEntity { WorkspaceId = Guid.Parse("d3e4f5c6-7891-0111-2131-415161718192"), AmenityId = 1 },
				new WorkspaceAmenityEntity { WorkspaceId = Guid.Parse("d3e4f5c6-7891-0111-2131-415161718192"), AmenityId = 3 },
				new WorkspaceAmenityEntity { WorkspaceId = Guid.Parse("d3e4f5c6-7891-0111-2131-415161718192"), AmenityId = 5 }
			};
			modelBuilder.Entity<WorkspaceAmenityEntity>().HasData(workspaceAmenities);
		}
	}
}
