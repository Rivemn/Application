using Application.Interfaces;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
	public static class ServiceExtensions
	{
		public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
		{
			services.AddScoped<IBookingAvailabilityUpdater, BookingAvailabilityUpdater>();
			services.AddHostedService<BookingAvailabilityHostedService>();


			return services;
		}
	}
}
