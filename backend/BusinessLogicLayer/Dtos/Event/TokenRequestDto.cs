namespace BusinessLogicLayer.Dtos.Event
{
	// Цей DTO буде використовуватися для запиту на оновлення токенів
	public class TokenRequestDto
	{
		public string AccessToken { get; set; } = string.Empty;
		public string RefreshToken { get; set; } = string.Empty;
	}
}
