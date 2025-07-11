package com._CServices.IVR_api.mapper;

import com._CServices.IVR_api.dto.UserDto;
import com._CServices.IVR_api.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {


    public UserDto toDto(User user) {

//         MAPPER WITH VERIFICATION
//        UserDto userDto = new UserDto();
//        if(user.getId() != null) userDto.setUserId(user.getId());
//        if(user.getFirstName() != null) userDto.setFirstName(user.getFirstName());
//        if(user.getLastName() != null) userDto.setLastName(user.getLastName());
//        if(user.getEmail() != null) userDto.setEmail(user.getEmail());
//        if(user.getUsername() != null) userDto.setUsername(user.getUsername());
//        if(user.getPassword() != null) userDto.setPassword(user.getPassword());
//        if(user.getActive() != null) userDto.setActive(user.getActive());
//        if(user.getRole()!= null) userDto.setRole(user.getRole().getName());
//        return userDto;


        return UserDto.builder()
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .roleName(user.getRole().getName())
                .active(user.getActive())
                .build();

    }
}
