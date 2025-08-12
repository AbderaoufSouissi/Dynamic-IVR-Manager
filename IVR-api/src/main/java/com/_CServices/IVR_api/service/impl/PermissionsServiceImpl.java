package com._CServices.IVR_api.service.impl;


import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.filter.PermissionsFilter;
import com._CServices.IVR_api.repository.permissions.PermissionsRepository;
import com._CServices.IVR_api.dto.request.PermissionsRequest;
import com._CServices.IVR_api.dto.response.PermissionsResponse;
import com._CServices.IVR_api.entity.Permissions;
import com._CServices.IVR_api.entity.Role;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ResourceAlreadyExistsException;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.mapper.PermissionsMapper;
import com._CServices.IVR_api.audit.AuditLoggingService;
import com._CServices.IVR_api.service.PermissionsService;
import com._CServices.IVR_api.utils.SortUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PermissionsServiceImpl implements PermissionsService {
    private final PermissionsRepository permissionsRepository;
    private final PermissionsMapper permissionsMapper;
    private final AuditLoggingService auditLoggingService;



    @Override
    public PagedResponse<PermissionsResponse> getFilteredPermissions(
            PermissionsFilter filter, Pageable pageable, String sortBy, String sortDir) {

        String sanitizedSortBy = SortUtils.sanitizeSortField(
                sortBy,
                SortUtils.getAllowedPermissionFields(),
                "permission_id"
        );
        String sanitizedSortDir = SortUtils.sanitizeSortDirection(sortDir);

        int offset = pageable.getPageNumber() * pageable.getPageSize();
        int limit = pageable.getPageSize();

        List<PermissionsResponse> content = permissionsRepository
                .findPermissionsWithFilters(filter, sanitizedSortBy, sanitizedSortDir, offset, limit);

        long total = permissionsRepository.countPermissionsWithFilters(filter);

        return PagedResponse.<PermissionsResponse>builder()
                .content(content)
                .page(pageable.getPageNumber())
                .size(pageable.getPageSize())
                .totalElements(total)
                .totalPages((int) Math.ceil((double) total / pageable.getPageSize()))
                .build();
    }






    @Override
    public PermissionsResponse getPermissionById(Long id) {
        log.info("inside getPermissionById()");

        Permissions permissions = permissionsRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Permission with id : "+id+" Not found"));
        return permissionsMapper.toDto(permissions);
    }





    @Override
    public PermissionsResponse createPermission(PermissionsRequest permissionsRequest) {
        log.info("inside createPermission()");

        if(null != permissionsRepository.findByName(permissionsRequest.getName())){
            throw new ResourceAlreadyExistsException("Permission "+permissionsRequest.getName()+ " already exists");
        }
        Permissions newPermissions = Permissions.builder()
                .name(permissionsRequest.getName())
                .description(permissionsRequest.getDescription())
                .roles(new HashSet<>())
                .build();


        Permissions createdPermission = permissionsRepository.save(newPermissions);

        auditLoggingService.logAction(
                ActionType.CREATE_PERMISSION.toString(),
                EntityType.PERMISSION.toString(),
                createdPermission.getId(),
                null
        );



        return permissionsMapper.toDto(createdPermission);
    }





    @Override
    @Transactional
    public void deletePermissionById(Long id) {
        log.info("inside deleteById()");

        Permissions permissionToDelete = permissionsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Permission with ID: " + id + " not found"));

        // Remove this permission from all roles
        Set<Role> rolesUsingPermission = new HashSet<>(permissionToDelete.getRoles());
        for (Role role : rolesUsingPermission) {
            role.removePermission(permissionToDelete); // This updates both sides
        }

        // Now it's safe to delete the permission
        permissionsRepository.delete(permissionToDelete);

        auditLoggingService.logAction(
                ActionType.DELETE_PERMISSION.toString(),
                EntityType.PERMISSION.toString(),
                permissionToDelete.getId(),
                null
        );
    }


    @Override
    public List<PermissionsResponse> getAllPermissions() {
        List<Permissions> permissions = permissionsRepository.findAll();
        return permissions.stream()
                .map(permissionsMapper::toDto)
                .collect(Collectors.toList());
    }





}
