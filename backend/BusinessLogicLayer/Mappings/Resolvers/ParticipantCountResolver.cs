using AutoMapper;
using BusinessLogicLayer.Dtos;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Mappings.Resolvers
{
	public class ParticipantCountResolver : IValueResolver<Event, EventDto, int>
	{
		private readonly IUnitOfWork _unitOfWork;

		public ParticipantCountResolver(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}

		public int Resolve(Event source, EventDto destination, int destMember, ResolutionContext context)
		{
			var eventRepo = (IEventRepository)_unitOfWork.Repository<Event>();

			return eventRepo.GetParticipantCountAsync(source.Id).GetAwaiter().GetResult();
		}
	}
}
