package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {




    //GESTION DES USERS

    Page<UserDto> getAllUsers(Pageable pageable);
    Page<UserDto> getUsersByActiveStatus(Boolean active, Pageable pageable);
    Page<UserDto> getUsersByRole(String roleName, Pageable pageable);
    Page<UserDto> getUsersByRoleAndActiveStatus(String role, Boolean active, Pageable pageable);
    UserDto getUserById(Long id);
    UserDto getUserByEmail(String email);
    UserDto getUserByUsername(String username);
    UserDto createUser(UserDto userDto);
    UserDto updateUser(UserDto userDto, Long id);
    void deleteUserById(Long id);
    void deleteUserByEmail(String email);
    void deleteUserByUsername(String username);
    Page<UserDto> getUsersByLastName(String lastName, Pageable pageable);
    Page<UserDto> getUsersByFirstName(String firstName, Pageable pageable);
    Page<UserDto> getUsersByFirstNameAndLastName(String firstName, String lastName, Pageable pageable);
}
