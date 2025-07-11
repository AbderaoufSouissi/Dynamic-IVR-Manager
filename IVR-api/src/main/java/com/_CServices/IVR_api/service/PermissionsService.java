package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.PermissionsDto;


import java.util.List;

public interface PermissionsService {
    List<PermissionsDto> getAllPermissions();
    PermissionsDto createPermission(PermissionsDto permissionsDto);
    void deleteById(Long id);
    void deleteByName(String permissionName);

}
