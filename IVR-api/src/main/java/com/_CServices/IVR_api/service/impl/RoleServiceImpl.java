package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.PermissionsRepository;
import com._CServices.IVR_api.dao.RoleRepository;

import com._CServices.IVR_api.dto.RoleDto;

import com._CServices.IVR_api.entity.Permissions;
import com._CServices.IVR_api.entity.Role;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ResourceAlreadyExistsException;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.mapper.RoleMapper;
import com._CServices.IVR_api.service.AuditService;
import com._CServices.IVR_api.service.AuthService;
import com._CServices.IVR_api.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final PermissionsRepository permissionsRepository;
    private final AuditService auditService;
    private final RoleMapper roleMapper;
    private final AuthService authService;


    @Override
    public List<RoleDto> getAllRoles() {
        log.info("inside getAllRoles()");

        List<Role> roles = roleRepository.findAll();
        List<RoleDto> rolesList = roles.stream()
                .map(role -> roleMapper.toDto(role))
                .toList();
        return rolesList;
    }

    @Override
    public RoleDto getRoleById(Long id) {
        log.info("inside getRoleById()");

        Role role = roleRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Role with id : "+id+" not found"));
        return roleMapper.toDto(role);
    }

    @Override
    public RoleDto getRoleByName(String roleName) {
        log.info("inside getRoleByName()");

        Role role = Optional.ofNullable(roleRepository.findByName(roleName))
                .orElseThrow(()-> new ResourceNotFoundException("Role with name : "+roleName+" not found"));
        return roleMapper.toDto(role);
    }

    @Override
    public RoleDto createRole(RoleDto roleDto) {

        log.info("inside createRole()");

        log.debug("Requested permissions: {}", roleDto.getPermissions());

        if (roleRepository.findByName(roleDto.getName()) != null) {
            throw new ResourceAlreadyExistsException("Role with name : "+roleDto.getName()+" already exists");
        }
        Set<Permissions> permissions = new HashSet<>();
        if(!roleDto.getPermissions().isEmpty()){

            roleDto.getPermissions().forEach(permissionName -> {
                if(!permissionsRepository.existsByName(permissionName)){
                    throw new ResourceNotFoundException("Permission with name : "+permissionName+" doesnt exist");
                }
                Permissions permission = permissionsRepository.findByName(permissionName);
                permissions.add(permission);

            });

        }

        Role role = Role.builder()
                .name(roleDto.getName())
                .permissions(permissions)
                .build();
        Role createdRole = roleRepository.save(role);



        User currentUser = authService.getCurrentLoggedInUser();

        auditService.logAction(
                currentUser,
                ActionType.CREATE_ROLE.toString(),
                EntityType.ROLE.toString(),
                createdRole.getId()
        );

        return roleMapper.toDto(createdRole);
    }



    @Override
    public RoleDto updateRoleByName(String roleName, RoleDto roleDto) {
        log.info("inside updateRoleByName()");

        Role roleToUpdate = Optional.ofNullable(roleRepository.findByName(roleName))
                .orElseThrow(()-> new ResourceNotFoundException("Role with name : "+roleName+" not found"));
        roleToUpdate.setName(roleDto.getName());
        //TO DO ADD LOGIC TO UPDATE PERMISSIONS
//        Set<String> permissionsToAdd = roleDto.getPermissions();
//        Set<Permissions> newPermissions = permissionsToAdd.stream().map(permission-> new Permissions())

        User currentUser = authService.getCurrentLoggedInUser();
        Role updatedRole =roleRepository.save(roleToUpdate);

        auditService.logAction(
                currentUser,
                ActionType.UPDATE_ROLE.toString(),
                EntityType.ROLE.toString(),
                roleToUpdate.getId()
        );
        return roleMapper.toDto(updatedRole);
    }

    @Override
    public RoleDto updateRoleById(Long id, RoleDto roleDto) {
        log.info("inside updateRoleById()");

        Role roleToUpdate = roleRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Role with id : "+id+" not found"));
        roleToUpdate.setName(roleDto.getName());
        //TO DO ADD LOGIC TO UPDATE PERMISSIONS
//        Set<String> permissionsToAdd = roleDto.getPermissions();
//        Set<Permissions> newPermissions = permissionsToAdd.stream().map(permission-> new Permissions())

        User currentUser = authService.getCurrentLoggedInUser();
        Role updatedRole = roleRepository.save(roleToUpdate);

        auditService.logAction(
                currentUser,
                ActionType.UPDATE_ROLE.toString(),
                EntityType.ROLE.toString(),
                id
        );

        return roleMapper.toDto(updatedRole);


    }

    @Override
    public void deleteRoleById(Long id) {
        log.info("inside deleteRole()");

        Role roleToDelete = roleRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Role with id : "+id+" not found"));
        roleRepository.delete(roleToDelete);
        User currentUser = authService.getCurrentLoggedInUser();

        auditService.logAction(
                currentUser,
                ActionType.DELETE_ROLE.toString(),
                EntityType.ROLE.toString(),
                roleToDelete.getId()
        );
    }

    @Override
    public void deleteRoleByName(String roleName) {
        log.info("inside deleteRoleByName()");

        Role roleToDelete = Optional.ofNullable(roleRepository.findByName(roleName))
                        .orElseThrow(()-> new ResourceNotFoundException("Role with name : "+roleName+" not found"));

        roleRepository.delete(roleToDelete);
        User currentUser = authService.getCurrentLoggedInUser();

        auditService.logAction(
                currentUser,
                ActionType.DELETE_ROLE.toString(),
                EntityType.ROLE.toString(),
                roleToDelete.getId()
        );


    }
}
