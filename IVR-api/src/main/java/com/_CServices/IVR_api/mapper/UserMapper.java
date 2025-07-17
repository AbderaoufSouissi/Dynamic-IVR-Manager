package com._CServices.IVR_api.mapper;

import com._CServices.IVR_api.dto.response.UserResponse;
import com._CServices.IVR_api.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {


    public UserResponse toDto(User user) {

        UserResponse userResponse = new UserResponse();
        if (user.getId() != null) userResponse.setUserId(user.getId());
        if (user.getFirstName() != null) userResponse.setFirstName(user.getFirstName());
        if (user.getLastName() != null) userResponse.setLastName(user.getLastName());
        if (user.getEmail() != null) userResponse.setEmail(user.getEmail());
        if (user.getUsername() != null) userResponse.setUsername(user.getUsername());
        if (user.getPassword() != null) userResponse.setPassword(user.getPassword());
        if (user.getActive() != null) userResponse.setActive(user.getActive());
        if (user.getRole() != null) userResponse.setRoleName(user.getRole().getName());
        if(user.getCreatedAt() != null) userResponse.setCreatedAt(user.getCreatedAt());
        if(user.getUpdatedAt() != null) userResponse.setUpdatedAt(user.getUpdatedAt());
        if(user.getCreatedBy() != null) userResponse.setCreatedBy(user.getCreatedBy().getUsername());
        if(user.getUpdatedBy() != null) userResponse.setUpdatedBy(user.getUpdatedBy().getUsername());
        return userResponse;
    }


}
