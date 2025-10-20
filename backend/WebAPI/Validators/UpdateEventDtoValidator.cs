using BusinessLogicLayer.Dtos;
using FluentValidation;

namespace WebAPI.Validators
{
	public class UpdateEventDtoValidator : AbstractValidator<UpdateEventDto>
	{
		public UpdateEventDtoValidator()
		{

			RuleFor(x => x.Title)
				.NotEmpty().WithMessage("Title cannot be empty.")
				.MaximumLength(200).WithMessage("Title must not exceed 200 characters.")
				.When(x => x.Title != null);

			RuleFor(x => x.Location)
				.NotEmpty().WithMessage("Location cannot be empty.")
				.MaximumLength(300).WithMessage("Location must not exceed 300 characters.")
				.When(x => x.Location != null);

			RuleFor(x => x.Start)
				.GreaterThan(DateTime.UtcNow).WithMessage("Start date must be in the future.")
				.When(x => x.Start != default);

			RuleFor(x => x.End)
				.GreaterThan(x => x.Start).WithMessage("End date must be after the start date.")
				.When(x => x.End.HasValue && x.Start != default);

			RuleFor(x => x.Capacity)
				.GreaterThan(0).WithMessage("Capacity must be a positive number.")
				.When(x => x.Capacity.HasValue);
		}
	}
}
