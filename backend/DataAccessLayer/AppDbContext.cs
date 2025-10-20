using DataAccessLayer.Configurations;
using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace DataAccessLayer.Data
{
	public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
	{


		public DbSet<User> Users { get; set; }
		public DbSet<Event> Events { get; set; }
		public DbSet<EventParticipant> EventParticipants { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);


			modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
		}
	}
}
