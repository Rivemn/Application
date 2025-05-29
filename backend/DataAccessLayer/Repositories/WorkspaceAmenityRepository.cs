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
        var exists = await _context.WorkspaceAmenities
            .AnyAsync(wa => wa.WorkspaceId == workspaceId && wa.AmenityId == amenityId);

        if (!exists)
        {
            await _context.WorkspaceAmenities.AddAsync(new WorkspaceAmenityEntity
            {
                WorkspaceId = workspaceId,
                AmenityId = amenityId
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

    public async Task<List<int>> GetAmenityIdsByWorkspaceIdAsync(Guid workspaceId)
    {
        return await _context.WorkspaceAmenities
            .Where(wa => wa.WorkspaceId == workspaceId)
            .Select(wa => wa.AmenityId)
            .ToListAsync();
    }
}
