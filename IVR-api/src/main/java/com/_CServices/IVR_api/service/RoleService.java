package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.RoleDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface RoleService {
    Page<RoleDto> getRolesWithFilters(
            Long id,
            String name,
            String createdByUsername,
            String updatedByUsername,
            LocalDate createdAt,
            LocalDate updatedAt,
            String sortBy,
            String sortDir,
            Pageable pageable);

    RoleDto getRoleById(Long id);
    RoleDto createRole(RoleDto roleDto);
    RoleDto updateRoleById(Long id ,RoleDto roleDto);
    RoleDto updateRoleByName(String roleName, RoleDto roleDto);
    void deleteRoleById(Long id);
    void deleteRoleByName(String roleName);

}
