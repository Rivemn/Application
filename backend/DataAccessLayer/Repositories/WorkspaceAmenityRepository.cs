using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Persistence.Entities;

namespace Persistence.Repositories;

public class WorkspaceAmenityRepository : IWorkspaceAmenityRepository
{
	private readonly AppDbContext _context;

	public WorkspaceAmenityRepository(AppDbContext context)
	{
		_context = context;
	}

	public async Task AddAsync(Guid workspaceId, int amenityId)
	{
		var (workspaceAmenity, error) = WorkspaceAmenity.Create(workspaceId, amenityId);
		if (!string.IsNullOrEmpty(error))
			throw new ArgumentException(error);

		var exists = await _context.WorkspaceAmenities
			.AnyAsync(wa => wa.WorkspaceId == workspaceId && wa.AmenityId == amenityId);

		if (!exists)
		{
			await _context.WorkspaceAmenities.AddAsync(new WorkspaceAmenityEntity
			{
				WorkspaceId = workspaceAmenity.WorkspaceId,
				AmenityId = workspaceAmenity.AmenityId
			});

			await _context.SaveChangesAsync();
		}
	}

	public async Task RemoveAsync(Guid workspaceId, int amenityId)
	{
		var entity = await _context.WorkspaceAmenities
			.FirstOrDefaultAsync(wa => wa.WorkspaceId == workspaceId && wa.AmenityId == amenityId);

		if (entity != null)
		{
			_context.WorkspaceAmenities.Remove(entity);
			await _context.SaveChangesAsync();
		}
	}

	public async Task<List<Amenity>> GetAmenitiesByWorkspaceIdAsync(Guid workspaceId)
	{
		var amenityData = await _context.WorkspaceAmenities
			.Where(wa => wa.WorkspaceId == workspaceId)
			.Join(
				_context.Amenities,
				wa => wa.AmenityId,
				a => a.Id,
				(wa, a) => new { a.Id, a.Name }
			)
			.ToListAsync();

		var result = new List<Amenity>();
		foreach (var a in amenityData)
		{
			var (domainAmenity, error) = Amenity.Create(a.Id, a.Name);
			if (domainAmenity != null)
			{
				result.Add(domainAmenity);
			}
	
		}

		return result;
	}


}
