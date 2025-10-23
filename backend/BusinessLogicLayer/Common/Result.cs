using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Common
{
	public class Result
	{
		public bool Succeeded { get; protected set; }
		public IEnumerable<string> Errors { get; protected set; } = Enumerable.Empty<string>();

		public string? ErrorCode { get; protected set; }

		public static Result Success() => new Result { Succeeded = true };

		public static Result Failure(IEnumerable<string> errors) =>
			new Result { Succeeded = false, Errors = errors };

		public static Result Failure(string error, string? errorCode = null) =>
			new Result { Succeeded = false, Errors = new[] { error }, ErrorCode = errorCode };

		public static Result<T> Success<T>(T data) => new Result<T>(data);
		public static Result<T> Failure<T>(IEnumerable<string> errors) => new Result<T>(errors);
		public static Result<T> Failure<T>(string error, string? errorCode = null) =>
			new Result<T>(error, errorCode);

	}
	public class Result<T> : Result
	{
		public T? Data { get; private set; }

		internal Result(T data)
		{
			Succeeded = true;
			Data = data;
		}

		internal Result(IEnumerable<string> errors)
		{
			Succeeded = false;
			Errors = errors;
		}
		internal Result(string error, string? errorCode = null)
		{
			Succeeded = false;
			Errors = new[] { error };
			ErrorCode = errorCode;
		}
	}

}
