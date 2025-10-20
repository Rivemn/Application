using FluentValidation;
using BusinessLogicLayer.Dtos;

namespace WebAPI.Validators
{
	public class RegisterRequestValidator : AbstractValidator<RegisterRequestDto>
	{
		public RegisterRequestValidator()
		{
			RuleFor(x => x.FullName)
							.NotEmpty().WithMessage("Full name is required.")
							.MaximumLength(200).WithMessage("Full name must not exceed 200 characters.");

			RuleFor(x => x.Email)
				.NotEmpty().WithMessage("Email is required.")
				.EmailAddress().WithMessage("A valid email address is required.");

			RuleFor(x => x.Password)
				.NotEmpty().WithMessage("Password is required.")
				.MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
				.Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
				.Matches("[a-z]").WithMessage("Password must contain at least one lowercase letter.")
				.Matches("[0-9]").WithMessage("Password must contain at least one number.");
		}
	}
}
