package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.PermissionsDto;


import java.util.List;

public interface PermissionsService {
    List<PermissionsDto> getAllPermissions();
    PermissionsDto getPermissionById(Long id);
    PermissionsDto getPermissionByName(String name);
    PermissionsDto getPermissionByDescription(String description);
    PermissionsDto createPermission(PermissionsDto permissionsDto);
    void deletePermissionById(Long id);
    void deletePermissionByName(String permissionName);

}
