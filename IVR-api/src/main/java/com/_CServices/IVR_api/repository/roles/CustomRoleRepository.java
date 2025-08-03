package com._CServices.IVR_api.repository.roles;

import com._CServices.IVR_api.dto.response.RoleResponse;
import com._CServices.IVR_api.filter.RoleFilter;

import java.util.List;

public interface CustomRoleRepository {
    List<RoleResponse> findRolesWithFilters(RoleFilter filter, int offset, int limit, String sortBy, String sortDir);
    int countRolesWithFilters(RoleFilter filter);
}
