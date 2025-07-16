package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.PermissionsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PermissionsService {
    Page<PermissionsDto> getAllPermissions(Pageable pageable);
    PermissionsDto getPermissionById(Long id);
    PermissionsDto getPermissionByName(String name);
    PermissionsDto getPermissionByDescription(String description);
    PermissionsDto createPermission(PermissionsDto permissionsDto);
    void deletePermissionById(Long id);
    void deletePermissionByName(String permissionName);

}
