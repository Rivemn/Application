using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Dtos
{
	public class AuthResultDto
	{
		public bool Succeeded { get; set; }
		public AuthResponseDto? Response { get; set; }
		public IEnumerable<string>? Errors { get; set; }

		public static AuthResultDto Success(AuthResponseDto response)
			=> new AuthResultDto { Succeeded = true, Response = response };

		public static AuthResultDto Failure(IEnumerable<string> errors)
			=> new AuthResultDto { Succeeded = false, Errors = errors };

		public static AuthResultDto Failure(string error)
			=> new AuthResultDto { Succeeded = false, Errors = new[] { error } };
	}
}
