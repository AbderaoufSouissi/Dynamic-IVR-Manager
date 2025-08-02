package com._CServices.IVR_api.repository;

import com._CServices.IVR_api.dto.response.PermissionsResponse;
import com._CServices.IVR_api.filter.PermissionsFilter;

import java.util.List;

public interface CustomPermissionsRepository {
    List<PermissionsResponse> findPermissionsWithFilters(PermissionsFilter filter,
                                                         String sortBy,
                                                         String sortDir,
                                                         int offset,
                                                         int limit);
    long countPermissionsWithFilters(PermissionsFilter filter);
}
