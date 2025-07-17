package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.response.PermissionsResponse;
import com._CServices.IVR_api.dto.request.PermissionsRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface PermissionsService {
    Page<PermissionsResponse> getPermissionsWithFilters(
            Long id,
            String name,
            String createdByUsername,
            String updatedByUsername,
            LocalDate createdAt,
            LocalDate updatedAt,
            String sortBy,
            String sortDir,
            Pageable pageable);
    PermissionsResponse getPermissionById(Long id);
    PermissionsResponse getPermissionByName(String name);
    PermissionsResponse getPermissionByDescription(String description);
    PermissionsResponse createPermission(PermissionsRequest permissionsRequest);
    void deletePermissionById(Long id);
    void deletePermissionByName(String permissionName);

}
