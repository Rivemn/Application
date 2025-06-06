using FluentValidation;
using WebAPI.Contracts;

namespace WebAPI.Validators
{
	public class PhotoValidator : AbstractValidator<PhotoRequest>
	{
		public PhotoValidator()
		{
			RuleFor(x => x.Url)
				.NotEmpty().WithMessage("URL is required.")
				.Matches(@"^photos\/[\w\-\/]+\/[\w\-]+\.(jpg|jpeg|png|gif|webp)$")
				.WithMessage("URL must be a valid relative path like 'photos/.../....[jpg|png|gif|webp]'");

			RuleFor(x => x.WorkspaceId)
				.NotEmpty().WithMessage("WorkspaceId is required.");
		}
	}
}
