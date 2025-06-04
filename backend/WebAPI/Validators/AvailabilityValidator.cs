using FluentValidation;
using WebAPI.Contracts;

namespace WebAPI.Validators
{
	public class AvailabilityValidator : AbstractValidator<AvailabilityRequest>
	{
		public AvailabilityValidator()
		{
			RuleFor(x => x.WorkspaceId).NotEmpty();
			RuleFor(x => x.Quantity).GreaterThan(0);
			RuleFor(x => x.CapacityOption).GreaterThan(0);
		}
	}
}
