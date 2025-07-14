package com._CServices.IVR_api.mapper;

import com._CServices.IVR_api.dto.RoleDto;
import com._CServices.IVR_api.entity.Role;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class RoleMapper {
    public RoleDto toDto(Role role) {
        RoleDto roleDto = new RoleDto();
        if(null != role.getId()) roleDto.setId(role.getId());
        if(null != role.getName() ) roleDto.setName(role.getName());
        if(null != role.getCreatedAt() ) roleDto.setCreatedAt(role.getCreatedAt());
        if(null != role.getCreatedBy() ) roleDto.setCreatedBy(role.getCreatedBy());
        if(null != role.getUpdatedAt() ) roleDto.setUpdatedAt(role.getUpdatedAt());
        if(null != role.getUpdatedBy() ) roleDto.setUpdatedBy(role.getUpdatedBy());

        if (null != role.getPermissions()) {
            Set<String> permissions = new HashSet<>();
            role.getPermissions().forEach(perm -> permissions.add(perm.getName()));
            roleDto.setPermissions(permissions);
        }
        else{
            roleDto.setPermissions(new HashSet<>());
        }
        return roleDto;
    }
}
