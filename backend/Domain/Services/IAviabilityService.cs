﻿using Domain.Models;

namespace Domain.Services
{
    public interface IAviabilityService
    {
        Task<(List<Availability> aviabilities, string error)> GetByWorkspaceIdAsync(Guid workspaceId);
		Task<(Availability? aviability, string error)> GetByIdAsync(Guid id);
		Task<(Guid id, string error)> CreateAsync(Guid workspaceId, int capacity, int capacityOption);
        Task<(bool success, string error)> DeleteAsync(Guid id);
    }
}
