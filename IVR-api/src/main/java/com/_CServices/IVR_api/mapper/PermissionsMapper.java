package com._CServices.IVR_api.mapper;

import com._CServices.IVR_api.dto.PermissionsDto;
import com._CServices.IVR_api.entity.Permissions;
import org.springframework.stereotype.Component;

@Component
public class PermissionsMapper {
    public PermissionsDto toDto(Permissions permissions) {
        PermissionsDto permissionsDto = new PermissionsDto();
        if(permissions.getId() != null) permissionsDto.setId(permissions.getId());
        if(permissions.getName() != null) permissionsDto.setName(permissions.getName());
        if(permissions.getDescription() != null) permissionsDto.setDescription(permissions.getDescription());
        if(permissions.getCreatedBy() != null) permissionsDto.setCreatedBy(permissions.getCreatedBy());
        if(permissions.getCreatedAt() != null) permissionsDto.setCreatedAt(permissions.getCreatedAt());
        if(permissions.getUpdatedBy() != null) permissionsDto.setUpdatedBy(permissions.getUpdatedBy());
        if(permissions.getUpdatedAt() != null) permissionsDto.setUpdatedAt(permissions.getUpdatedAt());
        return permissionsDto;
    }
}
