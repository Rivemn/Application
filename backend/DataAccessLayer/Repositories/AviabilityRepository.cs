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

        public async Task<List<Availability>> GetByWorkspaceIdAsync(Guid workspaceId)
        {
            var entities = await _context.Aviabilities
                .Include(a => a.Workspace)
                .Where(a => a.WorkspaceId == workspaceId)
                .ToListAsync();

            return entities
                .Select(e =>
                {
                    var workspace = Workspace.Create(e.Workspace.Id, e.Workspace.Name, e.Workspace.Description, e.Workspace.AvailabilityUnit,e.Workspace.CoworkingId).workspace!;
                    return Availability.Create(e.Id,workspace, e.Quantity, e.CapacityOption).aviability!;
                })
                .ToList();
        }

        public async Task<Guid> CreateAsync(Availability aviability)
        {
            var entity = new AvailabilityEntity
            {
                Id = Guid.NewGuid(),
                WorkspaceId = aviability.WorkspaceId,
                Quantity = aviability.Quantity,
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
		public async Task<bool> DecreaseQuantityAsync(Guid id)
		{
			var entity = await _context.Aviabilities.FindAsync(id);
			if (entity == null || entity.Quantity <= 0)
				return false;

			entity.Quantity -= 1;
			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<bool> IncreaseQuantityAsync(Guid id)
		{
			var entity = await _context.Aviabilities.FindAsync(id);
			if (entity == null)
				return false;

			entity.Quantity += 1;
			await _context.SaveChangesAsync();
			return true;
		}
	}
}
