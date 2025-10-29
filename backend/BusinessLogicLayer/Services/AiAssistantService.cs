using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Dtos.AI;
using BusinessLogicLayer.Dtos.Event;
using BusinessLogicLayer.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BusinessLogicLayer.Services
{

	public class AiAssistantService : IAiAssistantService
	{
		private readonly IHttpClientFactory _httpClientFactory;
		private readonly string _geminiApiKey;
		private readonly string _geminiApiUrl;

		private static readonly JsonSerializerOptions _jsonOptions = new()
		{
			PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
			DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
		};

		public AiAssistantService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
		{
			_httpClientFactory = httpClientFactory;
			_geminiApiKey = configuration["AiAssistant:GeminiApiKey"]
				?? throw new InvalidOperationException("Gemini API key is not configured.");
			_geminiApiUrl = configuration["AiAssistant:GeminiApiUrl"]
				?? throw new InvalidOperationException("Gemini API URL is not configured.");
		}

		// Цей метод вже відповідає сигнатурі в IAiAssistantService
		public async Task<Result<AiResponseDto>> GetAnswerAsync(AiQueryDto query)
		{
			string systemPrompt = CreateSystemPrompt(query.Events, query.Tags);
			string userPrompt = $"User question: \"{query.Question}\"";

			var httpClient = _httpClientFactory.CreateClient("GeminiClient"); // "GeminiClient" - це просто ім'я

			try
			{
				var payload = new
				{
					Contents = new[]
					{
						new { Parts = new[] { new { Text = systemPrompt }, new { Text = userPrompt } } }
					}
				};

				var fullApiUrl = $"{_geminiApiUrl}?key={_geminiApiKey}";

				var response = await httpClient.PostAsJsonAsync(fullApiUrl, payload, _jsonOptions);

				if (!response.IsSuccessStatusCode)
				{
					var errorContent = await response.Content.ReadAsStringAsync();
					return Result.Failure<AiResponseDto>($"AI API error: {response.StatusCode}. Details: {errorContent}");
				}

				var geminiResponse = await response.Content.ReadFromJsonAsync<GeminiResponse>();
				var answer = geminiResponse?.Candidates?.FirstOrDefault()?.Content?.Parts?.FirstOrDefault()?.Text;

				if (string.IsNullOrEmpty(answer))
				{
					return Result.Failure<AiResponseDto>("Received an empty answer from the AI.");
				}

				return Result.Success(new AiResponseDto { Answer = answer });
			}
			catch (Exception ex)
			{
				return Result.Failure<AiResponseDto>($"Failed to query AI service: {ex.Message}");
			}
		}

		private string CreateSystemPrompt(List<EventDto> events, List<TagDto> tags)
		{
			var today = DateTime.UtcNow.ToString("o"); // ISO 8601

			var dataSnapshot = new
			{
				TodayIs = today,
				AvailableTags = tags.Select(t => t.Name),
				UserEvents = events.Select(e => new
				{
					e.Id,
					e.Title,
					e.Start,
					e.Location,
					IsOrganizer = e.OrganizerName,
					Tags = e.Tags.Select(t => t.Name),
					ParticipantIds = e.ParticipantIds,
					ParticipantsCount = e.ParticipantsCount
				})
			};

			// Оновлюємо системний промпт, щоб AI знав про обмеження
			return $"""
                You are a helpful event assistant. Answer the user's question based *only* on the data provided below.
                Be concise and friendly. If the question cannot be answered with the given data, say "Sorry, I can't answer that based on the event data I have."

                Today's date is: {today}.

                --- DATA SNAPSHOT ---
                {JsonSerializer.Serialize(dataSnapshot, _jsonOptions)}
                --- END DATA SNAPSHOT ---
                
                IMPORTANT: You can count participants using 'ParticipantsCount' or by counting 'ParticipantIds'.
                You CANNOT list participant names, as you only have their IDs.
                """;
		}

		private class GeminiResponse{public List<GeminiCandidate>? Candidates { get; set; } }

		private class GeminiCandidate{public GeminiContent? Content { get; set; } }

		private class GeminiContent { public List<GeminiPart>? Parts { get; set; } }

		private class GeminiPart { public string? Text { get; set; } }


    }
}