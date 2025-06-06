using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Persistence.Entities;

namespace Persistence.Repositories
{
    public class AmenityRepository : IAmenityRepository
    {
        private readonly AppDbContext _context;

        public AmenityRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Amenity>> GetAllAsync()
        {
            var entities = await _context.Amenities.AsNoTracking().ToListAsync();
            return entities
                .Select(e => Amenity.Create(e.Id, e.Name).amenity!)
                .ToList();
        }

        public async Task<Amenity?> GetByIdAsync(int id)
        {
            var entity = await _context.Amenities.FindAsync(id);
            return entity == null ? null : Amenity.Create(entity.Id, entity.Name).amenity;
        }

        public async Task<int> CreateAsync(Amenity amenity)
        {
            var entity = new AmenityEntity
            {
                Id = amenity.Id,
                Name = amenity.Name
            };

            await _context.Amenities.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Amenities.FindAsync(id);
            if (entity == null)
                return false;

            _context.Amenities.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
