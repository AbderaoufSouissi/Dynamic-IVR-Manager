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
import com._CServices.IVR_api.security.AuthService;
import com._CServices.IVR_api.service.AuditService;
import com._CServices.IVR_api.service.PermissionsService;
import com._CServices.IVR_api.utils.SortUtils;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PermissionsServiceImpl implements PermissionsService {
    private final PermissionsRepository permissionsRepository;
    private final PermissionsMapper permissionsMapper;
    private final AuditService auditService;
    private final EntityManager entityManager;


    @Override
    public Page<PermissionsDto> getAllPermissions(Pageable pageable) {
        log.info("inside getAllPermissions() with pagination");

        String sortBy = SortUtils.sanitizeSortField(
                pageable.getSort().iterator().next().getProperty(),
                SortUtils.getAllowedPermissionFields(),
                "permission_id"
        );

        String sortDir = SortUtils.sanitizeSortDirection(
                pageable.getSort().iterator().next().getDirection().name()
        );

        int[] bounds = getRowBounds(pageable);
        int startRow = bounds[0];
        int endRow = bounds[1];

        String sql = """
        SELECT * FROM (
            SELECT p.*, ROWNUM rn FROM (
                SELECT * FROM permissions ORDER BY %s %s
            ) p WHERE ROWNUM <= :endRow
        ) WHERE rn > :startRow
    """.formatted(sortBy, sortDir);

        List<Permissions> permissions = entityManager.createNativeQuery(sql, Permissions.class)
                .setParameter("startRow", startRow)
                .setParameter("endRow", endRow)
                .getResultList();

        long total = permissionsRepository.count();

        List<PermissionsDto> permissionDtos = permissions.stream()
                .map(permissionsMapper::toDto)
                .toList();

        return new PageImpl<>(permissionDtos, pageable, total);
    }


    @Override
    public PermissionsDto getPermissionById(Long id) {
        log.info("inside getPermissionById()");

        Permissions permissions = permissionsRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Permission with id : "+id+" Not found"));
        return permissionsMapper.toDto(permissions);
    }

    @Override
    public PermissionsDto getPermissionByName(String name) {
        log.info("inside getPermissionByName()");

        Permissions permissions = Optional.ofNullable(permissionsRepository.findByName(name))
                .orElseThrow(()-> new ResourceNotFoundException("Permission with name : "+name+" Not found"));
        return permissionsMapper.toDto(permissions);
    }

    @Override
    public PermissionsDto getPermissionByDescription(String description) {
        log.info("inside getPermissionByDescription()");
        Permissions permissions = Optional.ofNullable(permissionsRepository.findByDescription(description))
                .orElseThrow(()-> new ResourceNotFoundException("Permission with description : "+description+" Not found"));

        return permissionsMapper.toDto(permissions);
    }

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


        Permissions createdPermission = permissionsRepository.save(newPermissions);

        auditService.logAction(
                ActionType.CREATE_PERMISSION.toString(),
                EntityType.PERMISSION.toString(),
                createdPermission.getId()
        );



        return permissionsMapper.toDto(createdPermission);
    }

    @Override
    public void deletePermissionById(Long id) {
        log.info("inside deleteById()");

        Permissions permissionToDelete = permissionsRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Permission with ID: "+id+" not found"));
        permissionsRepository.delete(permissionToDelete);

        auditService.logAction(
                ActionType.DELETE_PERMISSION.toString(),
                EntityType.PERMISSION.toString(),
                permissionToDelete.getId()
        );


    }

    @Override
    public void deletePermissionByName(String permissionName) {
        log.info("inside deleteByName()");

        Permissions permissionToDelete = Optional.ofNullable(permissionsRepository.findByName(permissionName))
                .orElseThrow(()-> new ResourceNotFoundException("Permission : "+permissionName+" not found"));

        permissionsRepository.delete(permissionToDelete);

        auditService.logAction(
                ActionType.DELETE_PERMISSION.toString(),
                EntityType.PERMISSION.toString(),
                permissionToDelete.getId()
        );


    }

    private int[] getRowBounds(Pageable pageable) {
        int startRow = (int) pageable.getOffset(); // page * size
        int endRow = startRow + pageable.getPageSize();
        return new int[]{startRow, endRow};
    }


}
