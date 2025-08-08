package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.request.RoleRequest;
import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.dto.response.RoleResponse;
import com._CServices.IVR_api.filter.RoleFilter;

import java.util.List;

public interface RoleService {
    PagedResponse<RoleResponse> getRolesWithFilters(RoleFilter filter, int page, int size, String sortBy, String sortDir);
    List<String> getAllRolesNames();
    RoleResponse getRoleById(Long id);
    RoleResponse createRole(RoleRequest roleRequest);
    RoleResponse updateRoleById(Long id ,RoleRequest roleRequest);
    void deleteRoleById(Long id);

}
