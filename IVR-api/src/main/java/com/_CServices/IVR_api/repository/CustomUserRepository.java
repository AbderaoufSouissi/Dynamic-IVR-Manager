package com._CServices.IVR_api.repository;

import com._CServices.IVR_api.dto.response.UserResponse;
import com._CServices.IVR_api.filter.UserFilter;

import java.util.List;

public interface CustomUserRepository {
    List<UserResponse> findUsersWithFilters(UserFilter filter, String sortBy, String sortDir, int offset, int limit);
    long countUsersWithFilters(UserFilter filter);
}
