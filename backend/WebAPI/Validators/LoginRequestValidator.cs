using FluentValidation;
using BusinessLogicLayer.Dtos;

namespace WebAPI.Validators
{
	public class LoginRequestValidator : AbstractValidator<LoginRequestDto>
	{
		public LoginRequestValidator()
		{
			RuleFor(x => x.Email).NotEmpty().EmailAddress();
			RuleFor(x => x.Password).NotEmpty();
		}
	}
}
