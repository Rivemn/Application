using AutoMapper;
using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Mappings.Resolvers;
using DataAccessLayer.Entities;

namespace BusinessLogicLayer.Mappings
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<User, RegisterRequestDto>().ReverseMap();
			CreateMap<User, AuthResponseDto>().ReverseMap();

			CreateMap<Event, EventDto>()
				.ForMember(dest => dest.ParticipantsCount, opt => opt.MapFrom<ParticipantCountResolver>())
				.ForMember(dest => dest.OrganizerId, opt => opt.MapFrom(src => src.OrganizerId))
				.ForMember(dest => dest.OrganizerName, opt => opt.MapFrom(src => src.Organizer.FullName)) 
				.ForMember(dest => dest.IsPublic, opt => opt.MapFrom(src => src.IsPublic));

			CreateMap<CreateEventDto, Event>();
			CreateMap<UpdateEventDto, Event>();
		}
	}
}
