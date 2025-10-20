using DataAccessLayer.Data;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly AppDbContext _context;
		private Hashtable? _repositories;

		public UnitOfWork(AppDbContext context)
		{
			_context = context;
		}

		public IRepository<T> Repository<T>() where T : class
		{
			if (_repositories == null)
			{
				_repositories = new Hashtable();
			}

			var type = typeof(T).Name;

			if (!_repositories.ContainsKey(type))
			{

				object repositoryInstance;

				if (typeof(T) == typeof(User))
				{
					repositoryInstance = new UserRepository(_context);
				}
				else if (typeof(T) == typeof(Event))
				{
					repositoryInstance = new EventRepository(_context);
				}
				else
				{
					var repositoryType = typeof(GenericRepository<>);
					repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(T)), _context);
				}

				_repositories.Add(type, repositoryInstance);

			}
			return (IRepository<T>)_repositories[type]!;
		}

		public async Task<int> CompleteAsync()
		{
			return await _context.SaveChangesAsync();
		}

		public void Dispose()
		{
			_context.Dispose();
			GC.SuppressFinalize(this);
		}
	}
}
