using FluentValidation;
using WebAPI.Contracts;

public class WorkspaceValidator : AbstractValidator<WorkspaceRequest>
{
	public WorkspaceValidator()
	{
		RuleFor(x => x.Name)
			.NotEmpty().WithMessage("Name is required.")
			.MaximumLength(100);

		RuleFor(x => x.Description)
			.MaximumLength(500);

		RuleFor(x => x.AvailabilityUnit)
			.NotEmpty().WithMessage("Availability Unit is required.");
	}
}
