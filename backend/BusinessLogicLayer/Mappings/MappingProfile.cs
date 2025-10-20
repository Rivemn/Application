using AutoMapper;
using DataAccessLayer.Entities;
using BusinessLogicLayer.Dtos;

namespace BusinessLogicLayer.Mappings
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<User, RegisterRequestDto>().ReverseMap();
			CreateMap<User, AuthResponseDto>().ReverseMap();

			CreateMap<Event, EventDto>()
							.ForMember(
								dest => dest.ParticipantsCount,
								opt => opt.MapFrom(src => src.Participants.Count)
							);

			CreateMap<CreateEventDto, Event>();
			CreateMap<UpdateEventDto, Event>();
			CreateMap<CreateEventDto, Event>();
			CreateMap<UpdateEventDto, Event>();
		}
	}
}
