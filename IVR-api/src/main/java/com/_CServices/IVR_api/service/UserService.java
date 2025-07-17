package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface UserService {




    //GESTION DES USERS
    Page<UserDto> getUsersWithFilters(
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
    UserDto getUserById(Long id);
    UserDto createUser(UserDto userDto);
    UserDto updateUser(UserDto userDto, Long id);
    void deleteUserById(Long id);
    void deleteUserByEmail(String email);
    void deleteUserByUsername(String username);
}
