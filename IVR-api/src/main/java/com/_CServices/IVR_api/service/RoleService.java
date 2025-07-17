package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.request.RoleRequest;
import com._CServices.IVR_api.dto.response.RoleResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface RoleService {
    Page<RoleResponse> getRolesWithFilters(
            Long id,
            String name,
            String createdByUsername,
            String updatedByUsername,
            LocalDate createdAt,
            LocalDate updatedAt,
            String sortBy,
            String sortDir,
            Pageable pageable);

    RoleResponse getRoleById(Long id);
    RoleResponse createRole(RoleRequest roleRequest);
    RoleResponse updateRoleById(Long id ,RoleRequest roleRequest);
    RoleResponse updateRoleByName(String roleName, RoleRequest roleRequest);
    void deleteRoleById(Long id);
    void deleteRoleByName(String roleName);

}
