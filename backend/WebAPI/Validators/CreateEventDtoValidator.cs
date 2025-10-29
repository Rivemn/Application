using BusinessLogicLayer.Dtos.Event;
using FluentValidation;

namespace WebAPI.Validators
{
	public class CreateEventDtoValidator : AbstractValidator<CreateEventDto>
	{
		public CreateEventDtoValidator()
		{
			RuleFor(x => x.Title)
				.NotEmpty().WithMessage("Title is required.")
				.MaximumLength(200).WithMessage("Title must not exceed 200 characters.");

			RuleFor(x => x.Location)
				.NotEmpty().WithMessage("Location is required.")
				.MaximumLength(300).WithMessage("Location must not exceed 300 characters.");

			RuleFor(x => x.Start)
				.NotEmpty().WithMessage("Start date is required.")
				.GreaterThan(DateTime.UtcNow).WithMessage("Start date must be in the future.");

			RuleFor(x => x.End)
				.GreaterThan(x => x.Start).WithMessage("End date must be after the start date.")
				.When(x => x.End.HasValue);

			RuleFor(x => x.Capacity)
				.GreaterThan(0).WithMessage("Capacity must be a positive number.")
				.When(x => x.Capacity.HasValue);

			RuleFor(x => x.TagNames)
				.Must(tags => tags == null || tags.Count <= 5)
				.WithMessage("An event cannot have more than 5 tags.");

			RuleForEach(x => x.TagNames)
				.MaximumLength(15).WithMessage("Tag name must not exceed 15 characters.");
		}
	}
}
