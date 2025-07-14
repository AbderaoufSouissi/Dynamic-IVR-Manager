package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.UserDto;
import jakarta.validation.Valid;
import java.util.List;

public interface UserService {




    //GESTION DES USERS

    List<UserDto> getAllUsers();
    List<UserDto> getUsersByActiveStatus(Boolean active);
    List<UserDto> getUsersByRole(String roleName);
    List<UserDto> getUsersByRoleAndActiveStatus(String role, Boolean active);
    UserDto getUserById(Long id);
    UserDto getUserByEmail(String email);
    UserDto getUserByUsername(String username);
    UserDto createUser(UserDto userDto);
    UserDto updateUser(UserDto userDto, Long id);
    void deleteUserById(Long id);
    void deleteUserByEmail(String email);
    void deleteUserByUsername(String username);



}
