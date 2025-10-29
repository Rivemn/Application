using AutoMapper;
using BusinessLogicLayer.Dtos.Auth;
using BusinessLogicLayer.Dtos.Event;
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
			CreateMap<Tag, TagDto>();

			CreateMap<Event, EventDto>()
				.ForMember(dest => dest.ParticipantsCount, opt => opt.MapFrom<ParticipantCountResolver>())
				.ForMember(dest => dest.OrganizerId, opt => opt.MapFrom(src => src.OrganizerId))
				.ForMember(dest => dest.OrganizerName, opt => opt.MapFrom(src => src.Organizer.FullName))
				.ForMember(dest => dest.IsPublic, opt => opt.MapFrom(src => src.IsPublic))
				.ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.EventTags.Select(et => et.Tag)));


			CreateMap<CreateEventDto, Event>()
				 .ForMember(dest => dest.EventTags, opt => opt.Ignore()) 
				 .ForMember(dest => dest.OrganizerId, opt => opt.Ignore()) 
				 .ForMember(dest => dest.Organizer, opt => opt.Ignore()); 

			CreateMap<UpdateEventDto, Event>()
				.ForMember(dest => dest.EventTags, opt => opt.Ignore()) 
				.ForMember(dest => dest.OrganizerId, opt => opt.Ignore())
				.ForMember(dest => dest.Organizer, opt => opt.Ignore());


			CreateMap<UpdateEventDto, Event>()
				.ForMember(dest => dest.EventTags, opt => opt.Ignore());
		}
	}
}
