﻿using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Persistence.Entities;

namespace Persistence.Repositories
{
	public class WorkspaceRepository : IWorkspaceRepository
	{
		private readonly AppDbContext _context;

		public WorkspaceRepository(AppDbContext context)
		{
			_context = context;
		}

		public async Task<List<Workspace>> GetAllAsync()
		{
			var entities = await _context.Workspaces.AsNoTracking().ToListAsync();
			var workspaces = entities
				.Select(e => Workspace.Create(e.Id, e.Name, e.Description, e.AvailabilityUnit, e.CoworkingId).workspace)
				.ToList();

			return workspaces;
		}

		public async Task<Workspace?> GetByIdAsync(Guid id)
		{
			var entity = await _context.Workspaces.FindAsync(id);
			if (entity == null)
				return null;

			return Workspace.Create(entity.Id, entity.Name, entity.Description, entity.AvailabilityUnit, entity.CoworkingId).workspace;
		}

		public async Task<List<Workspace>> GetByCoworkingIdAsync(Guid coworkingId)
		{
			var entities = await _context.Workspaces
				.AsNoTracking()
				.Where(w => w.CoworkingId == coworkingId)
				.ToListAsync();

			return entities
				.Select(e => Workspace.Create(e.Id, e.Name, e.Description, e.AvailabilityUnit, e.CoworkingId).workspace)
				.ToList();
		}

		public async Task<Guid> CreateAsync(Workspace workspace)
		{
			var entity = new WorkspaceEntity
			{
				Id = workspace.Id,
				Name = workspace.Name,
				Description = workspace.Description,
				AvailabilityUnit = workspace.AvailabilityUnit
			};

			await _context.Workspaces.AddAsync(entity);
			await _context.SaveChangesAsync();
			return entity.Id;
		}

		public async Task<bool> DeleteAsync(Guid id)
		{
			var entity = await _context.Workspaces.FindAsync(id);
			if (entity == null)
				return false;

			_context.Workspaces.Remove(entity);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}