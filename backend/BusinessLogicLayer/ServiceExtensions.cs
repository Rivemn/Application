using Application.Services;
using Domain.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Application
{
	public static class ServiceExtensions
	{
		public static IServiceCollection AddApplicationDependencies(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddScoped<IWorkspaceService, WorkspaceService>();
            services.AddScoped<IAmenityService, AmenityService>();
            services.AddScoped<IAviabilityService, AviabilityService>();
            services.AddScoped<IWorkspaceAmenityService, WorkspaceAmenityService>();
            services.AddScoped<IBookingService, BookingService>();
			services.AddScoped<IUserService, UserService>();
			return services;
		}
	}
}
