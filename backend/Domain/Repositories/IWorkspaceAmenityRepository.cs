using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IWorkspaceAmenityRepository
    {
        Task AddAsync(Guid workspaceId, int amenityId);
        Task RemoveAsync(Guid workspaceId, int amenityId);
        Task<List<int>> GetAmenityIdsByWorkspaceIdAsync(Guid workspaceId);
    }
}
