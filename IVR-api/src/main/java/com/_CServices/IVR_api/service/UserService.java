package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.UserDto;
import jakarta.validation.Valid;
import java.util.List;

public interface UserService {




    //GESTION DES USERS

    List<UserDto> getAllUsers();
    List<UserDto> getUsersByActiveStatus(boolean active);
    UserDto getUserById(Long id);
    UserDto getUserByEmail(String email);
    UserDto getUserByUsername(String username);
    UserDto createUser(@Valid UserDto userDto);
    UserDto updateUser(@Valid UserDto userDto, Long id);
    void deleteUserById(Long id);
    void deleteUserByEmail(String email);
    void deleteUserByUsername(String username);



}
