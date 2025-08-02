package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.PermissionsRepository;
import com._CServices.IVR_api.dao.RoleRepository;

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
import com._CServices.IVR_api.repository.UserRepository;
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
import org.springframework.transaction.annotation.Transactional;



import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;


@Service
@RequiredArgsConstructor
@Slf4j
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PermissionsRepository permissionsRepository;
    private final AuditLoggingService auditLoggingService;
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
                "           NVL(updater.username, '') AS updated_by_username, " +
                "           (SELECT COUNT(*) FROM role_permissions rp WHERE rp.role_id = r.role_id) AS permission_count " +  // <-- fixed space
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
                "    ORDER BY " + (sanitizedSortField.equals("permission_count")
                ? "permission_count"  // use alias, not subquery again
                : "r." + sanitizedSortField) + " " + sanitizedSortDir + " " +
                "  ) main_query WHERE ROWNUM <= ?" +
                ") WHERE rn > ?";


        try {
            Query query = entityManager.createNativeQuery(sql)
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

            List<Object[]> rows = query.getResultList();

            List<RoleResponse> roleResponses = new ArrayList<>();
            for (Object[] row : rows) {
                RoleResponse dto = new RoleResponse();
                dto.setRoleId(((Number) row[0]).longValue());
                dto.setName((String) row[1]);
                dto.setCreatedAt(((Timestamp) row[2]).toLocalDateTime());
                dto.setUpdatedAt(((Timestamp) row[3]).toLocalDateTime());
                dto.setCreatedBy((String) row[6]);
                dto.setUpdatedBy((String) row[7]);
                dto.setPermissionCount(((Number) row[8]).intValue());
                List<String> permissions = entityManager.createNativeQuery(
                                "SELECT p.permission_name " +
                                        "FROM role_permissions rp " +
                                        "JOIN permissions p ON rp.permission_id = p.permission_id " +
                                        "WHERE rp.role_id = :roleId")
                        .setParameter("roleId", dto.getRoleId())
                        .getResultList();

                dto.setPermissions(new HashSet<>(permissions));

                roleResponses.add(dto);;
            }
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
            return new PageImpl<>(roleResponses, pageable, total);


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

        // 1. Find the role to delete
        Role roleToDelete = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role with id: " + id + " not found"));

        // 2. Find the default role (must exist)
        Role defaultRole = Optional.ofNullable(roleRepository.findByName("DEFAULT_ROLE"))
                .orElseThrow(() -> new IllegalStateException("DEFAULT_ROLE must exist in the system"));

        // 3. Reassign users to DEFAULT_ROLE
        List<User> usersWithRole = userRepository.findUsersWithRole(id);
        if (!usersWithRole.isEmpty()) {
            log.info("Reassigning {} users from role {} to DEFAULT_ROLE",
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


    private int[] getRowBounds(Pageable pageable) {
        int startRow = (int) pageable.getOffset(); // page * size
        int endRow = startRow + pageable.getPageSize();
        return new int[]{startRow, endRow};
    }
}
