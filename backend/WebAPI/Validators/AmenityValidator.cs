using FluentValidation;
using WebAPI.Contracts;

namespace WebAPI.Validators
{
	public class AmenityValidator : AbstractValidator<AmenityRequest>
	{
		public AmenityValidator()
		{
			RuleFor(x => x.Name)
				.NotEmpty().WithMessage("Name is required.")
				.MaximumLength(25).WithMessage("Name must be at most 25 characters.");
		}
	}
}
