using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Common
{
	public static class EventErrorCodes
	{
		public const string EventNotFound = "EVENT_NOT_FOUND";
		public const string EventFull = "EVENT_FULL";
		public const string AlreadyJoined = "ALREADY_JOINED";
		public const string NotParticipant = "NOT_PARTICIPANT";
		public const string Forbidden = "FORBIDDEN";
	}
}
