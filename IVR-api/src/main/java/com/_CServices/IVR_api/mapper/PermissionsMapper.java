package com._CServices.IVR_api.mapper;


import com._CServices.IVR_api.dto.response.PermissionsResponse;
import com._CServices.IVR_api.entity.Permissions;
import org.springframework.stereotype.Component;

@Component
public class PermissionsMapper {
    public PermissionsResponse toDto(Permissions permissions) {
        PermissionsResponse permissionsResponse = new PermissionsResponse();
        if(permissions.getId() != null) permissionsResponse.setPermissionId(permissions.getId());
        if(permissions.getName() != null) permissionsResponse.setName(permissions.getName());
        if(permissions.getDescription() != null) permissionsResponse.setDescription(permissions.getDescription());
        if(permissions.getCreatedBy() != null) permissionsResponse.setCreatedBy(permissions.getCreatedBy().getUsername());
        if(permissions.getCreatedAt() != null) permissionsResponse.setCreatedAt(permissions.getCreatedAt());
        if(permissions.getUpdatedBy() != null) permissionsResponse.setUpdatedBy(permissions.getUpdatedBy().getUsername());
        if(permissions.getUpdatedAt() != null) permissionsResponse.setUpdatedAt(permissions.getUpdatedAt());
        return permissionsResponse;
    }
}
