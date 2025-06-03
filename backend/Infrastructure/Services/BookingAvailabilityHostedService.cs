using Application.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services
{
	public class BookingAvailabilityHostedService : BackgroundService
	{
		private readonly IServiceScopeFactory _scopeFactory;
		private readonly ILogger<BookingAvailabilityHostedService> _logger;

		public BookingAvailabilityHostedService(
			IServiceScopeFactory scopeFactory,
			ILogger<BookingAvailabilityHostedService> logger)
		{
			_scopeFactory = scopeFactory;
			_logger = logger;
		}

		protected override async Task ExecuteAsync(CancellationToken stoppingToken)
		{
			_logger.LogInformation("Hosted service started.");

			while (!stoppingToken.IsCancellationRequested)
			{
				try
				{
					using var scope = _scopeFactory.CreateScope();
					var updater = scope.ServiceProvider.GetRequiredService<IBookingAvailabilityUpdater>();
					await updater.UpdateAsync(stoppingToken);
				}
				catch (Exception ex)
				{
					_logger.LogError(ex, "Error occurred while updating booking availability.");
				}

				await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
			}

			_logger.LogInformation("Hosted service stopped.");
		}
	}
}
