package com._CServices.IVR_api.service.impl;


import com._CServices.IVR_api.dao.PermissionsRepository;
import com._CServices.IVR_api.dto.PermissionsDto;
import com._CServices.IVR_api.entity.Permissions;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ResourceAlreadyExistsException;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.mapper.PermissionsMapper;
import com._CServices.IVR_api.service.AuditService;
import com._CServices.IVR_api.service.AuthService;
import com._CServices.IVR_api.service.PermissionsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PermissionsServiceImpl implements PermissionsService {
    private final PermissionsRepository permissionsRepository;
    private final PermissionsMapper permissionsMapper;
    private final AuditService auditService;
    private final AuthService authService;

    @Override
    public PermissionsDto createPermission(PermissionsDto permissionsDto) {
        log.info("inside createPermission()");

        if(null != permissionsRepository.findByName(permissionsDto.getName())){
            throw new ResourceAlreadyExistsException("Permission "+permissionsDto.getName()+ " already exists");
        }
        Permissions newPermissions = Permissions.builder()
                .name(permissionsDto.getName())
                .description(permissionsDto.getDescription())
                .roles(new HashSet<>())
                .build();

        User currentUser = authService.getCurrentLoggedInUser();
        Permissions createdPermission = permissionsRepository.save(newPermissions);

        auditService.logAction(
                currentUser,
                ActionType.CREATE_PERMISSION.toString(),
                createdPermission.getClass().getSimpleName(),
                createdPermission.getId()
        );



        return permissionsMapper.toDto(createdPermission);
    }

    @Override
    public void deleteById(Long id) {
        log.info("inside deleteById()");

        Permissions permissionToDelete = permissionsRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Permission with ID: "+id+" not found"));
        permissionsRepository.delete(permissionToDelete);
        User currentUser = authService.getCurrentLoggedInUser();
        auditService.logAction(
                currentUser,
                ActionType.DELETE_PERMISSION.toString(),
                permissionToDelete.getClass().getSimpleName(),
                permissionToDelete.getId()
        );


    }

    @Override
    public void deleteByName(String permissionName) {
        log.info("inside deleteByName()");

        Permissions permissionToDelete = Optional.ofNullable(permissionsRepository.findByName(permissionName))
                .orElseThrow(()-> new ResourceNotFoundException("Permission : "+permissionName+" not found"));

        permissionsRepository.delete(permissionToDelete);
        User currentUser = authService.getCurrentLoggedInUser();
        auditService.logAction(
                currentUser,
                ActionType.DELETE_PERMISSION.toString(),
                permissionToDelete.getClass().getSimpleName(),
                permissionToDelete.getId()
        );


    }


}
