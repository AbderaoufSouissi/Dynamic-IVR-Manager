package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.RoleDto;

import java.util.List;

public interface RoleService {
    List<RoleDto> getAllRoles();
    RoleDto getRoleById(Long id);
    RoleDto getRoleByName(String roleName);
    RoleDto createRole(RoleDto roleDto);
    RoleDto updateRoleById(Long id ,RoleDto roleDto);
    RoleDto updateRoleByName(String roleName, RoleDto roleDto);
    void deleteRoleById(Long id);
    void deleteRoleByName(String roleName);

}
