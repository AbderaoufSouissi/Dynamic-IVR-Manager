package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.request.CreateUserRequest;
import com._CServices.IVR_api.dto.request.UpdateUserRequest;
import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.dto.response.UserResponse;
import com._CServices.IVR_api.filter.UserFilter;

public interface UserService {



    PagedResponse<UserResponse> getUsers(UserFilter filter, int page, int size, String sortBy, String sortDir);
    UserResponse getUserById(Long id);
    UserResponse createUser(CreateUserRequest request);
    UserResponse updateUser(UpdateUserRequest userRequest, Long id);
    long getUsersByActive(int active);
    void deleteUserById(Long id);
    void deleteUserByEmail(String email);
    void deleteUserByUsername(String username);
}
