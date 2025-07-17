package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.request.UserRequest;
import com._CServices.IVR_api.dto.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface UserService {




    //GESTION DES USERS
    Page<UserResponse> getUsersWithFilters(
            Long id,
            String firstName,
            String lastName,
            String username,
            String email,
            Boolean active,
            String roleName,
            String createdByUsername,
            String updatedByUsername,
            LocalDate createdAt,
            LocalDate updatedAt,
            String sortBy,
            String sortDir,
            Pageable pageable);
    UserResponse getUserById(Long id);
    UserResponse createUser(UserRequest userRequest);
    UserResponse updateUser(UserRequest userRequest, Long id);
    void deleteUserById(Long id);
    void deleteUserByEmail(String email);
    void deleteUserByUsername(String username);
}
