package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.PermissionsDto;
import com._CServices.IVR_api.enumeration.ActionType;

public interface PermissionsService {
    PermissionsDto createPermission(PermissionsDto permissionsDto);
    void deleteById(Long id);
    void deleteByName(String permissionName);

}
