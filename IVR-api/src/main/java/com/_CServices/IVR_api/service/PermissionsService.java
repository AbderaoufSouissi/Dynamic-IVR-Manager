package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.dto.response.PermissionsResponse;
import com._CServices.IVR_api.dto.request.PermissionsRequest;
import com._CServices.IVR_api.filter.PermissionsFilter;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PermissionsService {
    PagedResponse<PermissionsResponse> getFilteredPermissions(PermissionsFilter filter,
                                                              Pageable pageable,
                                                              String sortBy,
                                                              String sortDir);
    PermissionsResponse getPermissionById(Long id);
    PermissionsResponse createPermission(PermissionsRequest permissionsRequest);
    void deletePermissionById(Long id);
    List<PermissionsResponse> getAllPermissions();
}
