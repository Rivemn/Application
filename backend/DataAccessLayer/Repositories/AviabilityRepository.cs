using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Persistence.Entities;

namespace Persistence.Repositories
{
    public class AviabilityRepository : IAviabilityRepository
    {
        private readonly AppDbContext _context;

        public AviabilityRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Aviability>> GetByWorkspaceIdAsync(Guid workspaceId)
        {
            var entities = await _context.Aviabilities
                .Include(a => a.Workspace)
                .Where(a => a.WorkspaceId == workspaceId)
                .ToListAsync();

            return entities
                .Select(e =>
                {
                    var workspace = Workspace.Create(e.Workspace.Id, e.Workspace.Name, e.Workspace.Description, e.Workspace.AviabilityUnit).workspace!;
                    return Aviability.Create(workspace, e.Capacity, e.CapacityOption).aviability!;
                })
                .ToList();
        }

        public async Task<Guid> CreateAsync(Aviability aviability)
        {
            var entity = new AviabilityEntity
            {
                Id = Guid.NewGuid(),
                WorkspaceId = aviability.WorkspaceId,
                Capacity = aviability.Capacity,
                CapacityOption = aviability.CapacityOption
            };

            await _context.Aviabilities.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await _context.Aviabilities.FindAsync(id);
            if (entity == null)
                return false;

            _context.Aviabilities.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
