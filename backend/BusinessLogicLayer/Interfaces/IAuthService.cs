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
		Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request);
		Task<AuthResponseDto> LoginAsync(LoginRequestDto request);
	}
}
