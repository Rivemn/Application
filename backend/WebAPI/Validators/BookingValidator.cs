using FluentValidation;
using WebAPI.Contracts;
using System;

namespace WebAPI.Validators
{
	public class BookingValidator : AbstractValidator<BookingRequest>
	{
		public BookingValidator()
		{
			RuleFor(x => x.FullName).NotEmpty().MaximumLength(100);
			RuleFor(x => x.Email).NotEmpty().EmailAddress();
			RuleFor(x => x.WorkspaceId).NotEmpty();
			RuleFor(x => x.AvailabilityId).NotEmpty();

			RuleFor(x => x)
				.Must(booking =>
				{
					var duration = booking.End - booking.Start;
					return duration.TotalHours >= 1 && duration.TotalDays <= 30;
				})
				.WithMessage("The booking duration must be at least 1 hour and at most 30 days.");

			RuleFor(x => x.Start)
				.LessThan(x => x.End)
				.WithMessage("Start time must be before end time.");
		}
	}
}
