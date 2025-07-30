package com._CServices.IVR_api.mapper;

import com._CServices.IVR_api.dto.response.RoleResponse;
import com._CServices.IVR_api.entity.Role;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class RoleMapper {
    public RoleResponse toDto(Role role) {
        RoleResponse roleResponse = new RoleResponse();
        if(null != role.getId()) roleResponse.setRoleId(role.getId());
        if(null != role.getName() ) roleResponse.setName(role.getName());
        if(null != role.getCreatedAt() ) roleResponse.setCreatedAt(role.getCreatedAt());
        if(null != role.getCreatedBy() ) roleResponse.setCreatedBy(role.getCreatedBy().getUsername());
        if(null != role.getUpdatedAt() ) roleResponse.setUpdatedAt(role.getUpdatedAt());
        if(null != role.getUpdatedBy() ) roleResponse.setUpdatedBy(role.getUpdatedBy().getUsername());

        if (null != role.getPermissions()) {
            Set<String> permissions = new HashSet<>();
            role.getPermissions().forEach(perm -> permissions.add(perm.getName()));
            roleResponse.setPermissions(permissions);
            roleResponse.setPermissionCount(permissions.size());
        }
        else{
            roleResponse.setPermissions(new HashSet<>());
            roleResponse.setPermissionCount(0);
        }
        return roleResponse;
    }
}
