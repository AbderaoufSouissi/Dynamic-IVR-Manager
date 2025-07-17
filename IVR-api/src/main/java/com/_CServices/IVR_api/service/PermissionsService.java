package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.PermissionsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface PermissionsService {
    Page<PermissionsDto> getPermissionsWithFilters(
            Long id,
            String name,
            String createdByUsername,
            String updatedByUsername,
            LocalDate createdAt,
            LocalDate updatedAt,
            String sortBy,
            String sortDir,
            Pageable pageable);
    Page<PermissionsDto> getAllPermissions(Pageable pageable);
    PermissionsDto getPermissionById(Long id);
    PermissionsDto getPermissionByName(String name);
    PermissionsDto getPermissionByDescription(String description);
    PermissionsDto createPermission(PermissionsDto permissionsDto);
    void deletePermissionById(Long id);
    void deletePermissionByName(String permissionName);

}
