package com._CServices.IVR_api.mapper;

import com._CServices.IVR_api.dto.UserDto;
import com._CServices.IVR_api.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {


    public UserDto toDto(User user) {

        UserDto userDto = new UserDto();
        if (user.getId() != null) userDto.setUserId(user.getId());
        if (user.getFirstName() != null) userDto.setFirstName(user.getFirstName());
        if (user.getLastName() != null) userDto.setLastName(user.getLastName());
        if (user.getEmail() != null) userDto.setEmail(user.getEmail());
        if (user.getUsername() != null) userDto.setUsername(user.getUsername());
        if (user.getPassword() != null) userDto.setPassword(user.getPassword());
        if (user.getActive() != null) userDto.setActive(user.getActive());
        if (user.getRole() != null) userDto.setRoleName(user.getRole().getName());
        return userDto;
    }


}
