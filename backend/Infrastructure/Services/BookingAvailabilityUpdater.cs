﻿using Application.Interfaces;
using Application.Services;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Services;

public class BookingAvailabilityUpdater : IBookingAvailabilityUpdater
{
	private readonly AppDbContext _dbContext;

	public BookingAvailabilityUpdater(AppDbContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task UpdateAsync(CancellationToken cancellationToken)
	{
		var now = DateTime.UtcNow;

		// Завершить истёкшие бронирования
		var expiredBookings = await _dbContext.Bookings
			.Where(b => b.End < now && b.Status != "Completed")
			.ToListAsync(cancellationToken);

		foreach (var booking in expiredBookings)
		{
			booking.Status = "Completed";

			var aviability = await _dbContext.Aviabilities
				.FirstOrDefaultAsync(a => a.Id == booking.AvailabilityId, cancellationToken);

			if (aviability != null)
			{
				aviability.Quantity += 1; // Освобождаем комнату
			}
		}

		// Начать бронирования, которые должны начаться
		var startingBookings = await _dbContext.Bookings
			.Where(b => b.Start <= now && b.Status == "Pending")
			.ToListAsync(cancellationToken);

		foreach (var booking in startingBookings)
		{
			booking.Status = "InProgress"; // или "Occupied", если у вас такой статус есть

			var aviability = await _dbContext.Aviabilities
				.FirstOrDefaultAsync(a => a.Id == booking.AvailabilityId, cancellationToken);

			if (aviability != null && aviability.Quantity > 0)
			{
				aviability.Quantity -= 1; // Занимаем комнату
			}
		}

		await _dbContext.SaveChangesAsync(cancellationToken);
	}

}
