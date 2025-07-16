package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.RoleDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoleService {
    Page<RoleDto> getAllRoles(Pageable pageable);
    RoleDto getRoleById(Long id);
    RoleDto getRoleByName(String roleName);
    RoleDto createRole(RoleDto roleDto);
    RoleDto updateRoleById(Long id ,RoleDto roleDto);
    RoleDto updateRoleByName(String roleName, RoleDto roleDto);
    void deleteRoleById(Long id);
    void deleteRoleByName(String roleName);

}
