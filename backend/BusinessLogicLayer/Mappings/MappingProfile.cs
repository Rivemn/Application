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
							)
							.ForMember(dest => dest.OrganizerId, opt => opt.MapFrom(src => src.OrganizerId))
			                .ForMember(dest => dest.OrganizerName, opt => opt.MapFrom(src => src.Organizer.FullName))
							.ForMember(dest => dest.ParticipantIds,opt => opt.MapFrom(src => src.Participants.Select(p => p.UserId.ToString()))
				            ); 

			CreateMap<CreateEventDto, Event>();
			CreateMap<UpdateEventDto, Event>();
			CreateMap<CreateEventDto, Event>();
			CreateMap<UpdateEventDto, Event>();
		}
	}
}
