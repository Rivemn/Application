using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Interfaces
{
	public interface IAuthService
	{
		Task<Result<AuthResponseDto>> RegisterAsync(RegisterRequestDto request);
		Task<Result<AuthResponseDto>> LoginAsync(LoginRequestDto request);
		Task<Result<AuthResponseDto>> RefreshTokenAsync(RefreshTokenRequestDto request, string accessToken);
	}
}
