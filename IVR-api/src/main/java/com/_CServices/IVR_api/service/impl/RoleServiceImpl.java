package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.PermissionsRepository;
import com._CServices.IVR_api.dao.RoleRepository;

import com._CServices.IVR_api.dto.response.RoleResponse;


import com._CServices.IVR_api.dto.request.RoleRequest;
import com._CServices.IVR_api.dto.response.RoleResponse;
import com._CServices.IVR_api.entity.Permissions;
import com._CServices.IVR_api.entity.Role;

import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ResourceAlreadyExistsException;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.mapper.RoleMapper;
import com._CServices.IVR_api.security.AuthService;
import com._CServices.IVR_api.service.AuditService;
import com._CServices.IVR_api.service.RoleService;
import com._CServices.IVR_api.utils.SortUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final PermissionsRepository permissionsRepository;
    private final AuditService auditService;
    private final RoleMapper roleMapper;
    private final EntityManager entityManager;



    @Override
    public Page<RoleResponse> getRolesWithFilters(
            Long id,
            String name,
            String createdByUsername,
            String updatedByUsername,
            LocalDate createdAt,
            LocalDate updatedAt,
            String sortBy,
            String sortDir,
            Pageable pageable) {

        log.info("Fetching roles with filters");

        // Sanitize sorting
        String sanitizedSortField = SortUtils.sanitizeSortField(
                sortBy != null ? sortBy.toLowerCase() : "",
                SortUtils.getAllowedRoleFields(),
                "role_id"
        );
        String sanitizedSortDir = SortUtils.sanitizeSortDirection(sortDir);

        // Pagination bounds
        int[] bounds = getRowBounds(pageable);
        int startRow = bounds[0];
        int endRow = bounds[1];

        // Date-time filtering ranges
        LocalDateTime startCreatedAt = null;
        LocalDateTime endCreatedAt = null;
        if (createdAt != null) {
            startCreatedAt = createdAt.atStartOfDay();
            endCreatedAt = createdAt.atTime(LocalTime.MAX);
        }

        LocalDateTime startUpdatedAt = null;
        LocalDateTime endUpdatedAt = null;
        if (updatedAt != null) {
            startUpdatedAt = updatedAt.atStartOfDay();
            endUpdatedAt = updatedAt.atTime(LocalTime.MAX);
        }

        // Main query SQL
        String sql = "SELECT * FROM (" +
                "  SELECT main_query.*, ROWNUM rn FROM (" +
                "    SELECT r.role_id, r.role_name, r.created_at, r.updated_at, r.created_by_id, r.updated_by_id, " +
                "           NVL(creator.username, '') AS created_by_username, " +
                "           NVL(updater.username, '') AS updated_by_username " +
                "    FROM roles r " +
                "    LEFT JOIN app_users creator ON r.created_by_id = creator.user_id " +
                "    LEFT JOIN app_users updater ON r.updated_by_id = updater.user_id " +
                "    WHERE (? IS NULL OR r.role_id = ?) " +
                "      AND (? IS NULL OR LOWER(r.role_name) LIKE '%' || LOWER(?) || '%') " +
                "      AND ( " +
                "            ? IS NULL OR ( " +
                "              creator.username IS NOT NULL AND LOWER(creator.username) LIKE '%' || LOWER(?) || '%' " +
                "            ) " +
                "          ) " +
                "      AND ( " +
                "            ? IS NULL OR ( " +
                "              updater.username IS NOT NULL AND LOWER(updater.username) LIKE '%' || LOWER(?) || '%' " +
                "            ) " +
                "          ) " +
                "      AND ((? IS NULL AND ? IS NULL) OR (r.created_at BETWEEN ? AND ?)) " +
                "      AND ((? IS NULL AND ? IS NULL) OR (r.updated_at BETWEEN ? AND ?)) " +
                "    ORDER BY r." + sanitizedSortField + " " + sanitizedSortDir +
                "  ) main_query WHERE ROWNUM <= ?" +
                ") WHERE rn > ?";

        try {
            Query query = entityManager.createNativeQuery(sql, Role.class)
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

            List<Role> roles = query.getResultList();

            // Count query
            String countSql = "SELECT COUNT(r.role_id) " +
                    "FROM roles r " +
                    "LEFT JOIN app_users creator ON r.created_by_id = creator.user_id " +
                    "LEFT JOIN app_users updater ON r.updated_by_id = updater.user_id " +
                    "WHERE (? IS NULL OR r.role_id = ?) " +
                    "  AND (? IS NULL OR LOWER(r.role_name) LIKE '%' || LOWER(?) || '%') " +
                    "  AND ( " +
                    "        ? IS NULL OR ( " +
                    "          creator.username IS NOT NULL AND LOWER(creator.username) LIKE '%' || LOWER(?) || '%' " +
                    "        ) " +
                    "      ) " +
                    "  AND ( " +
                    "        ? IS NULL OR ( " +
                    "          updater.username IS NOT NULL AND LOWER(updater.username) LIKE '%' || LOWER(?) || '%' " +
                    "        ) " +
                    "      ) " +
                    "  AND ((? IS NULL AND ? IS NULL) OR (r.created_at BETWEEN ? AND ?)) " +
                    "  AND ((? IS NULL AND ? IS NULL) OR (r.updated_at BETWEEN ? AND ?))";

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
                    roles.stream().map(roleMapper::toDto).collect(Collectors.toList()),
                    pageable,
                    total
            );

        } catch (Exception e) {
            log.error("Error fetching filtered roles", e);
            throw new RuntimeException("Error fetching roles with filters", e);
        }
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

        auditService.logAction(
                ActionType.CREATE_ROLE.toString(),
                EntityType.ROLE.toString(),
                createdRole.getId()
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



        auditService.logAction(
                ActionType.UPDATE_ROLE.toString(),
                EntityType.ROLE.toString(),
                updatedRole.getId()
        );

        return roleMapper.toDto(updatedRole);
    }


    @Override
    public RoleResponse updateRoleById(Long id, RoleRequest roleDto) {
        log.info("inside updateRoleById()");

        Role roleToUpdate = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role with id: " + id + " not found"));

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


        auditService.logAction(
                ActionType.UPDATE_ROLE.toString(),
                EntityType.ROLE.toString(),
                updatedRole.getId()
        );

        return roleMapper.toDto(updatedRole);
    }

    @Override
    public void deleteRoleById(Long id) {
        log.info("inside deleteRole()");

        Role roleToDelete = roleRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Role with id : "+id+" not found"));
        roleRepository.delete(roleToDelete);


        auditService.logAction(
                ActionType.DELETE_ROLE.toString(),
                EntityType.ROLE.toString(),
                id
        );
    }

    @Override
    public void deleteRoleByName(String roleName) {
        log.info("inside deleteRoleByName()");

        Role roleToDelete = Optional.ofNullable(roleRepository.findByName(roleName))
                        .orElseThrow(()-> new ResourceNotFoundException("Role with name : "+roleName+" not found"));

        Long roleToDeleteId = roleToDelete.getId();

        roleRepository.delete(roleToDelete);

        auditService.logAction(
                ActionType.DELETE_ROLE.toString(),
                EntityType.ROLE.toString(),
                roleToDeleteId
        );


    }


    private int[] getRowBounds(Pageable pageable) {
        int startRow = (int) pageable.getOffset(); // page * size
        int endRow = startRow + pageable.getPageSize();
        return new int[]{startRow, endRow};
    }
}
