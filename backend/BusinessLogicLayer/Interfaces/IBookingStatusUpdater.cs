namespace Application.Interfaces
{
	public interface IBookingAvailabilityUpdater
	{
		Task UpdateAsync(CancellationToken cancellationToken);
	}

}
