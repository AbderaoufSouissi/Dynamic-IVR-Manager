package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.exception.ActionNotAllowedException;
import com._CServices.IVR_api.repository.permissions.PermissionsRepository;
import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.filter.RoleFilter;
import com._CServices.IVR_api.repository.roles.RoleRepository;

import com._CServices.IVR_api.dto.response.RoleResponse;
import com._CServices.IVR_api.dto.request.RoleRequest;
import com._CServices.IVR_api.entity.Permissions;
import com._CServices.IVR_api.entity.Role;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ResourceAlreadyExistsException;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.mapper.RoleMapper;
import com._CServices.IVR_api.audit.AuditLoggingService;
import com._CServices.IVR_api.repository.users.UserRepository;
import com._CServices.IVR_api.service.RoleService;
import com._CServices.IVR_api.utils.SortUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;

import static com._CServices.IVR_api.constant.Constants.DEFAULT_ROLE_NAME;
import static com._CServices.IVR_api.constant.Constants.SYSTEM_ROLE_NAME;


@Service
@RequiredArgsConstructor
@Slf4j
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PermissionsRepository permissionsRepository;
    private final AuditLoggingService auditLoggingService;
    private final RoleMapper roleMapper;



    @Override
    public PagedResponse<RoleResponse> getRolesWithFilters(RoleFilter filter, int page, int size, String sortBy, String sortDir) {
        int offset = page * size;

        String sanitizedSortBy = SortUtils.sanitizeSortField(
                sortBy,
                SortUtils.getAllowedRoleFields(),
                "role_id"
        );
        String sanitizedSortDir = SortUtils.sanitizeSortDirection(sortDir);

        List<RoleResponse> roles = roleRepository.findRolesWithFilters(filter, offset, size, sanitizedSortBy, sanitizedSortDir);
        int totalElements = roleRepository.countRolesWithFilters(filter);

        return PagedResponse.<RoleResponse>builder()
                .content(roles)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages((int) Math.ceil((double) totalElements / size))
                .build();

    }





    @Override
    public RoleResponse getRoleById(Long id) {
        log.info("inside getRoleById()");

        Role role = roleRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Role with id : "+id+" not found"));
        return roleMapper.toDto(role);
    }


    @Override
    public RoleResponse createRole(RoleRequest roleRequest) {

        log.info("inside createRole()");

        log.debug("Requested permissions: {}", roleRequest.getPermissions());

        if (roleRepository.findByName(roleRequest.getName()) != null) {
            throw new ResourceAlreadyExistsException("Role with name : "+roleRequest.getName()+" already exists");
        }
        Set<Permissions> permissions = new HashSet<>();
        if(!roleRequest.getPermissions().isEmpty()){

            roleRequest.getPermissions().forEach(permissionName -> {
                if(!permissionsRepository.existsByName(permissionName)){
                    throw new ResourceNotFoundException("Permission with name : "+permissionName+" doesnt exist");
                }
                Permissions permission = permissionsRepository.findByName(permissionName);
                permissions.add(permission);

            });

        }

        Role role = Role.builder()
                .name(roleRequest.getName())
                .permissions(permissions)
                .build();
        Role createdRole = roleRepository.save(role);

        auditLoggingService.logAction(
                ActionType.CREATE_ROLE.toString(),
                EntityType.ROLE.toString(),
                createdRole.getId(),null
        );

        return roleMapper.toDto(createdRole);
    }



    @Override
    public RoleResponse updateRoleByName(String roleName, RoleRequest roleRequest) {
        log.info("inside updateRoleByName()");

        Role roleToUpdate = Optional.ofNullable(roleRepository.findByName(roleName))
                .orElseThrow(() -> new ResourceNotFoundException("Role with name: " + roleName + " not found"));


        roleToUpdate.setName(roleRequest.getName());


        Set<Permissions> newPermissions = new HashSet<>();

        if (roleRequest.getPermissions() != null && !roleRequest.getPermissions().isEmpty()) {
            roleRequest.getPermissions().forEach(permissionName -> {
                Permissions permission = Optional.ofNullable(permissionsRepository.findByName(permissionName))
                        .orElseThrow(() -> new ResourceNotFoundException("Permission with name: " + permissionName + " doesn't exist"));
                newPermissions.add(permission);
            });
        }


        roleToUpdate.clearPermissions();
        roleToUpdate.setPermissions(newPermissions);


        Role updatedRole = roleRepository.save(roleToUpdate);



        auditLoggingService.logAction(
                ActionType.UPDATE_ROLE.toString(),
                EntityType.ROLE.toString(),
                updatedRole.getId(),
                null
        );

        return roleMapper.toDto(updatedRole);
    }


    @Override
    public RoleResponse updateRoleById(Long id, RoleRequest roleDto) {
        log.info("inside updateRoleById()");

        Role roleToUpdate = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role with id: " + id + " not found"));
        if(isSystemRole(roleToUpdate.getName()) || isDefaultRole(roleToUpdate.getName())){
            throw new ActionNotAllowedException("Cette Action est Strictement Interdite");
        }

        roleToUpdate.setName(roleDto.getName());

        Set<Permissions> newPermissions = new HashSet<>();

        if (roleDto.getPermissions() != null && !roleDto.getPermissions().isEmpty()) {
            roleDto.getPermissions().forEach(permissionName -> {
                Permissions permission = Optional.ofNullable(permissionsRepository.findByName(permissionName))
                        .orElseThrow(() -> new ResourceNotFoundException("Permission with name: " + permissionName + " doesn't exist"));
                newPermissions.add(permission);
            });
        }

        roleToUpdate.clearPermissions();
        roleToUpdate.setPermissions(newPermissions);

        Role updatedRole = roleRepository.save(roleToUpdate);


        auditLoggingService.logAction(
                ActionType.UPDATE_ROLE.toString(),
                EntityType.ROLE.toString(),
                updatedRole.getId(),
                null
        );

        return roleMapper.toDto(updatedRole);
    }
    @Transactional
    @Override
    public void deleteRoleById(Long id) {
        log.info("Starting deletion of role with id: {}", id);


        Role roleToDelete = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role with id: " + id + " not found"));
    if(isDefaultRole(roleToDelete.getName()) || isSystemRole(roleToDelete.getName())){
        throw new ActionNotAllowedException("Cette Action est strictement Interdite");
    }

        Role defaultRole = Optional.ofNullable(roleRepository.findByName(DEFAULT_ROLE_NAME))
                .orElseThrow(() -> new IllegalStateException("DEFAULT_ROLE must exist in the system"));


        List<User> usersWithRole = userRepository.findUsersWithRole(id);
        if (!usersWithRole.isEmpty()) {
            log.info("Reassigning {} users from role {} to default",
                    usersWithRole.size(), roleToDelete.getName());

            usersWithRole.forEach(user -> {
                user.setRole(defaultRole);
                userRepository.save(user);
            });
            userRepository.flush(); // Ensure user updates are committed
        }

        // 4. Clear all permission associations
        log.info("Clearing {} permission associations for role {}",
                roleToDelete.getPermissions().size(), roleToDelete.getName());

        // Create a copy to avoid ConcurrentModificationException
        Set<Permissions> permissionsCopy = new HashSet<>(roleToDelete.getPermissions());
        permissionsCopy.forEach(permission -> {
            roleToDelete.removePermission(permission);
        });
        roleRepository.saveAndFlush(roleToDelete);

        // 5. Delete the role
        roleRepository.delete(roleToDelete);
        log.info("Successfully deleted role with id: {}", id);

        // 6. Audit logging
        auditLoggingService.logAction(
                ActionType.DELETE_ROLE.toString(),
                EntityType.ROLE.toString(),
                id,
                null
        );
    }

    @Override
    public void deleteRoleByName(String roleName) {
        log.info("inside deleteRoleByName()");
        if(isSystemRole(roleName)){
            throw new ActionNotAllowedException("Le role system ne peut pas etre supprimé");
        }

        Role roleToDelete = Optional.ofNullable(roleRepository.findByName(roleName))
                        .orElseThrow(()-> new ResourceNotFoundException("Role with name : "+roleName+" not found"));

        Long roleToDeleteId = roleToDelete.getId();

        roleRepository.delete(roleToDelete);

        auditLoggingService.logAction(
                ActionType.DELETE_ROLE.toString(),
                EntityType.ROLE.toString(),
                roleToDeleteId,
                null
        );


    }

    private boolean isSystemRole(String name) {
        return name.equals(SYSTEM_ROLE_NAME);
    }

    private boolean isDefaultRole(String name) {
        return name.equals(DEFAULT_ROLE_NAME);
    }



}
