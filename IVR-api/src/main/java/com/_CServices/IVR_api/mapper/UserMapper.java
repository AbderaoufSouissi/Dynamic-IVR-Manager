package com._CServices.IVR_api.mapper;

import com._CServices.IVR_api.dto.UserDto;
import com._CServices.IVR_api.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto toDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .active(user.getActive())
                .build();

    }
}
