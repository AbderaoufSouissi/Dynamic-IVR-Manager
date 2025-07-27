package com._CServices.IVR_api.service.impl;


import com._CServices.IVR_api.dao.PermissionsRepository;
import com._CServices.IVR_api.dto.request.PermissionsRequest;
import com._CServices.IVR_api.dto.response.PermissionsResponse;
import com._CServices.IVR_api.entity.Permissions;
import com._CServices.IVR_api.entity.Role;
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
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PermissionsServiceImpl implements PermissionsService {
    private final PermissionsRepository permissionsRepository;
    private final PermissionsMapper permissionsMapper;
    private final AuditService auditService;
    private final EntityManager entityManager;


    @Override
    public Page<PermissionsResponse> getPermissionsWithFilters(
            Long id,
            String name,
            String createdByUsername,
            String updatedByUsername,
            LocalDate createdAt,
            LocalDate updatedAt,
            String sortBy,
            String sortDir,
            Pageable pageable) {

        log.info("Fetching permissions with filters");

        // Sanitize sorting
        String sanitizedSortField = SortUtils.sanitizeSortField(
                sortBy != null ? sortBy.toLowerCase() : "",
                SortUtils.getAllowedPermissionFields(), // <-- make sure this exists
                "permission_id"
        );
        String sanitizedSortDir = SortUtils.sanitizeSortDirection(sortDir);

        // Pagination bounds
        int[] bounds = getRowBounds(pageable);
        int startRow = bounds[0];
        int endRow = bounds[1];

        // Date-time filtering ranges
        LocalDateTime startCreatedAt = createdAt != null ? createdAt.atStartOfDay() : null;
        LocalDateTime endCreatedAt = createdAt != null ? createdAt.atTime(LocalTime.MAX) : null;
        LocalDateTime startUpdatedAt = updatedAt != null ? updatedAt.atStartOfDay() : null;
        LocalDateTime endUpdatedAt = updatedAt != null ? updatedAt.atTime(LocalTime.MAX) : null;

        String sql = "SELECT * FROM (" +
                "  SELECT main_query.*, ROWNUM rn FROM (" +
                "    SELECT p.permission_id, p.permission_name, p.description, p.created_at, p.updated_at, " +
                "           p.created_by_id, p.updated_by_id, " +
                "           NVL(creator.username, '') AS created_by_username, " +
                "           NVL(updater.username, '') AS updated_by_username " +
                "    FROM permissions p " +
                "    LEFT JOIN app_users creator ON p.created_by_id = creator.user_id " +
                "    LEFT JOIN app_users updater ON p.updated_by_id = updater.user_id " +
                "    WHERE (? IS NULL OR p.permission_id = ?) " +
                "      AND (? IS NULL OR LOWER(p.permission_name) LIKE '%' || LOWER(?) || '%') " +
                "      AND (? IS NULL OR LOWER(NVL(creator.username, '')) LIKE '%' || LOWER(?) || '%') " +
                "      AND (? IS NULL OR LOWER(NVL(updater.username, '')) LIKE '%' || LOWER(?) || '%') " +
                "      AND ((? IS NULL AND ? IS NULL) OR (p.created_at BETWEEN ? AND ?)) " +
                "      AND ((? IS NULL AND ? IS NULL) OR (p.updated_at BETWEEN ? AND ?)) " +
                "    ORDER BY p." + sanitizedSortField + " " + sanitizedSortDir +
                "  ) main_query WHERE ROWNUM <= ?" +
                ") WHERE rn > ?";

        try {
            Query query = entityManager.createNativeQuery(sql, Permissions.class)
                    .setParameter(1, id)
                    .setParameter(2, id)
                    .setParameter(3, name)
                    .setParameter(4, name)
                    .setParameter(5, createdByUsername)
                    .setParameter(6, createdByUsername)
                    .setParameter(7, updatedByUsername)
                    .setParameter(8, updatedByUsername)
                    .setParameter(9, startCreatedAt)
                    .setParameter(10, endCreatedAt)
                    .setParameter(11, startCreatedAt)
                    .setParameter(12, endCreatedAt)
                    .setParameter(13, startUpdatedAt)
                    .setParameter(14, endUpdatedAt)
                    .setParameter(15, startUpdatedAt)
                    .setParameter(16, endUpdatedAt)
                    .setParameter(17, endRow)
                    .setParameter(18, startRow);

            List<Permissions> permissions = query.getResultList();

            // Count query
            String countSql = "SELECT COUNT(p.permission_id) " +
                    "FROM permissions p " +
                    "LEFT JOIN app_users creator ON p.created_by_id = creator.user_id " +
                    "LEFT JOIN app_users updater ON p.updated_by_id = updater.user_id " +
                    "WHERE (? IS NULL OR p.permission_id = ?) " +
                    "  AND (? IS NULL OR LOWER(p.permission_name) LIKE '%' || LOWER(?) || '%') " +
                    "  AND (? IS NULL OR LOWER(NVL(creator.username, '')) LIKE '%' || LOWER(?) || '%') " +
                    "  AND (? IS NULL OR LOWER(NVL(updater.username, '')) LIKE '%' || LOWER(?) || '%') " +
                    "  AND ((? IS NULL AND ? IS NULL) OR (p.created_at BETWEEN ? AND ?)) " +
                    "  AND ((? IS NULL AND ? IS NULL) OR (p.updated_at BETWEEN ? AND ?))";

            Query countQuery = entityManager.createNativeQuery(countSql)
                    .setParameter(1, id)
                    .setParameter(2, id)
                    .setParameter(3, name)
                    .setParameter(4, name)
                    .setParameter(5, createdByUsername)
                    .setParameter(6, createdByUsername)
                    .setParameter(7, updatedByUsername)
                    .setParameter(8, updatedByUsername)
                    .setParameter(9, startCreatedAt)
                    .setParameter(10, endCreatedAt)
                    .setParameter(11, startCreatedAt)
                    .setParameter(12, endCreatedAt)
                    .setParameter(13, startUpdatedAt)
                    .setParameter(14, endUpdatedAt)
                    .setParameter(15, startUpdatedAt)
                    .setParameter(16, endUpdatedAt);

            long total = ((Number) countQuery.getSingleResult()).longValue();

            return new PageImpl<>(
                    permissions.stream().map(permissionsMapper::toDto).collect(Collectors.toList()),
                    pageable,
                    total
            );

        } catch (Exception e) {
            log.error("Error fetching filtered permissions", e);
            throw new RuntimeException("Error fetching permissions with filters", e);
        }
    }





    @Override
    public PermissionsResponse getPermissionById(Long id) {
        log.info("inside getPermissionById()");

        Permissions permissions = permissionsRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Permission with id : "+id+" Not found"));
        return permissionsMapper.toDto(permissions);
    }

    @Override
    public PermissionsResponse getPermissionByName(String name) {
        log.info("inside getPermissionByName()");

        Permissions permissions = Optional.ofNullable(permissionsRepository.findByName(name))
                .orElseThrow(()-> new ResourceNotFoundException("Permission with name : "+name+" Not found"));
        return permissionsMapper.toDto(permissions);
    }

    @Override
    public PermissionsResponse getPermissionByDescription(String description) {
        log.info("inside getPermissionByDescription()");
        Permissions permissions = Optional.ofNullable(permissionsRepository.findByDescription(description))
                .orElseThrow(()-> new ResourceNotFoundException("Permission with description : "+description+" Not found"));

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

        auditService.logAction(
                ActionType.CREATE_PERMISSION.toString(),
                EntityType.PERMISSION.toString(),
                createdPermission.getId()
        );



        return permissionsMapper.toDto(createdPermission);
    }

//    //OLD VERSION of delete method
//    @Override
//    public void deletePermissionById(Long id) {
//        log.info("inside deleteById()");
//
//        Permissions permissionToDelete = permissionsRepository.findById(id)
//                .orElseThrow(()-> new ResourceNotFoundException("Permission with ID: "+id+" not found"));
//        permissionsRepository.delete(permissionToDelete);
//
//        auditService.logAction(
//                ActionType.DELETE_PERMISSION.toString(),
//                EntityType.PERMISSION.toString(),
//                permissionToDelete.getId()
//        );
//
//
//    }



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
