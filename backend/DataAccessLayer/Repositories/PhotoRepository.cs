using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Persistence.Entities;

namespace Persistence.Repositories
{
	public class PhotoRepository : IPhotoRepository
	{
		private readonly AppDbContext _context;

		public PhotoRepository(AppDbContext context)
		{
			_context = context;
		}

		public async Task<List<Photo>> GetByWorkspaceIdAsync(Guid workspaceId)
		{
			var entities = await _context.Photos
				.AsNoTracking()
				.Where(p => p.WorkspaceId == workspaceId)
				.ToListAsync();

			var photos = entities
				.Select(p => Photo.Create(p.Id, p.Url, p.WorkspaceId,p.CoworkingId).photo)
				.Where(p => p != null)!
				.ToList()!;

			return photos;
		}

		public async Task<List<Photo>> GetByCoworkingIdAsync(Guid coworkingId)
		{
			var entities = await _context.Photos
				.AsNoTracking()
				.Where(p => p.CoworkingId == coworkingId)
				.ToListAsync();

			var photos = entities
				.Select(p => Photo.Create(p.Id, p.Url, p.WorkspaceId,p.CoworkingId).photo)
				.Where(p => p != null)!
				.ToList()!;

			return photos;
		}

		public async Task AddAsync(Photo photo)
		{
			var entity = new PhotoEntity
			{
				Id = photo.Id,
				Url = photo.Url,
				WorkspaceId = photo.WorkspaceId
			};

			_context.Photos.Add(entity);
			await _context.SaveChangesAsync();
		}

		public async Task<bool> DeleteAsync(int id)
		{
			var entity = await _context.Photos.FindAsync(id);
			if (entity == null) return false;

			_context.Photos.Remove(entity);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}
