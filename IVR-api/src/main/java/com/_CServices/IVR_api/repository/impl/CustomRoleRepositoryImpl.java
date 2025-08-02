package com._CServices.IVR_api.repository.impl;

import com._CServices.IVR_api.dto.response.PermissionsResponse;
import com._CServices.IVR_api.dto.response.RoleResponse;
import com._CServices.IVR_api.filter.RoleFilter;
import com._CServices.IVR_api.repository.CustomRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class CustomRoleRepositoryImpl implements CustomRoleRepository {

    private final JdbcTemplate jdbcTemplate;

    public List<RoleResponse> findRolesWithFilters(RoleFilter filter, int offset, int limit, String sortBy, String sortDir) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT * FROM ( ")
                .append("  SELECT inner_query.*, ROWNUM rn FROM ( ")
                .append("    SELECT r.role_id, r.role_name, r.created_at, r.updated_at, ")
                .append("           cu.username AS created_by_username, ")
                .append("           uu.username AS updated_by_username, ")
                .append("           (SELECT COUNT(*) FROM role_permissions rp WHERE rp.role_id = r.role_id) AS permission_count ")
                .append("    FROM roles r ")
                .append("    LEFT JOIN app_users cu ON r.created_by_id = cu.user_id ")
                .append("    LEFT JOIN app_users uu ON r.updated_by_id = uu.user_id ")
                .append("    WHERE 1=1 ");

        // Filters
        if (filter.getId() != null) {
            sql.append(" AND r.role_id = ? ");
            params.add(filter.getId());
        }
        if (filter.getName() != null) {
            sql.append(" AND LOWER(r.role_name) LIKE ? ");
            params.add("%" + filter.getName().toLowerCase() + "%");
        }
        if (filter.getCreatedBy() != null) {
            sql.append(" AND LOWER(cu.username) LIKE ? ");
            params.add("%" + filter.getCreatedBy().toLowerCase() + "%");
        }
        if (filter.getUpdatedBy() != null) {
            sql.append(" AND LOWER(uu.username) LIKE ? ");
            params.add("%" + filter.getUpdatedBy().toLowerCase() + "%");
        }
        if (filter.getCreatedAt() != null) {
            sql.append(" AND r.created_at BETWEEN ? AND ? ");
            params.add(filter.getCreatedAt().atStartOfDay());
            params.add(filter.getCreatedAt().atTime(LocalTime.MAX));
        }
        if (filter.getUpdatedAt() != null) {
            sql.append(" AND r.updated_at BETWEEN ? AND ? ");
            params.add(filter.getUpdatedAt().atStartOfDay());
            params.add(filter.getUpdatedAt().atTime(LocalTime.MAX));
        }
        if (filter.getPermissionCount() > 0) {
            sql.append(" AND (SELECT COUNT(*) FROM role_permissions rp WHERE rp.role_id = r.role_id) >= ? ");
            params.add(filter.getPermissionCount());
        }

        // Sorting - **do NOT prefix permission_count with 'r.' because it's an alias, not a column**
        if ("permissionCount".equalsIgnoreCase(sortBy)) {
            sql.append(" ORDER BY permission_count ").append(sortDir).append(" ");
        } else {
            // Defensive: prefix column with alias r.
            sql.append(" ORDER BY ").append(sortBy).append(" ").append(sortDir).append(" ");
        }

        // Pagination with ROWNUM for Oracle
        sql.append("  ) inner_query WHERE ROWNUM <= ? ")
                .append(") WHERE rn > ?");

        params.add(offset + limit);
        params.add(offset);

        List<RoleResponse> roles = jdbcTemplate.query(sql.toString(), params.toArray(), roleRowMapper());

        // Fetch permissions and set them into roles
        Map<Long, Set<PermissionsResponse>> permissionsMap = fetchPermissionsForRoles(roles);

        for (RoleResponse role : roles) {
            Set<PermissionsResponse> permissionObjects = permissionsMap.getOrDefault(role.getRoleId(), Collections.emptySet());
            Set<String> permissionNames = permissionObjects.stream()
                    .map(PermissionsResponse::getName)
                    .collect(Collectors.toSet());

            role.setPermissions(permissionNames);
            role.setPermissionCount(permissionNames.size());
        }

        return roles;
    }



    public int countRolesWithFilters(RoleFilter filter) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("""
            SELECT COUNT(*)
            FROM roles r
            LEFT JOIN app_users cu ON r.created_by_id = cu.user_id
            LEFT JOIN app_users uu ON r.updated_by_id = uu.user_id
            WHERE 1=1
        """);

        if (filter.getId() != null) {
            sql.append(" AND r.role_id = ? ");
            params.add(filter.getId());
        }
        if (filter.getName() != null) {
            sql.append(" AND LOWER(r.role_name) LIKE ? ");
            params.add("%" + filter.getName().toLowerCase() + "%");
        }
        if (filter.getCreatedBy() != null) {
            sql.append(" AND LOWER(cu.username) LIKE ? ");
            params.add("%" + filter.getCreatedBy().toLowerCase() + "%");
        }
        if (filter.getUpdatedBy() != null) {
            sql.append(" AND LOWER(uu.username) LIKE ? ");
            params.add("%" + filter.getUpdatedBy().toLowerCase() + "%");
        }
        if (filter.getCreatedAt() != null) {
            sql.append(" AND r.created_at BETWEEN ? AND ? ");
            params.add(filter.getCreatedAt().atStartOfDay());
            params.add(filter.getCreatedAt().atTime(LocalTime.MAX));
        }
        if (filter.getUpdatedAt() != null) {
            sql.append(" AND r.updated_at BETWEEN ? AND ? ");
            params.add(filter.getUpdatedAt().atStartOfDay());
            params.add(filter.getUpdatedAt().atTime(LocalTime.MAX));
        }

        return jdbcTemplate.queryForObject(sql.toString(), params.toArray(), Integer.class);
    }

    private RowMapper<RoleResponse> roleRowMapper() {
        return (rs, rowNum) -> {
            RoleResponse role = new RoleResponse();
            role.setRoleId(rs.getLong("role_id"));
            role.setName(rs.getString("role_name"));
            role.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
            role.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());
            role.setCreatedBy(rs.getString("created_by_username"));
            role.setUpdatedBy(rs.getString("updated_by_username"));
            return role;
        };
    }

    private Map<Long, Set<PermissionsResponse>> fetchPermissionsForRoles(List<RoleResponse> roles) {
        if (roles.isEmpty()) return Collections.emptyMap();

        List<Long> roleIds = roles.stream().map(RoleResponse::getRoleId).toList();

        String sql = """
            SELECT rp.role_id, p.permission_id, p.permission_name
            FROM role_permissions rp
            JOIN permissions p ON rp.permission_id = p.permission_id
            WHERE rp.role_id IN (%s)
        """.formatted(roleIds.stream().map(id -> "?").collect(Collectors.joining(",")));

        List<Object> params = new ArrayList<>(roleIds);

        Map<Long, Set<PermissionsResponse>> result = new HashMap<>();

        jdbcTemplate.query(sql, params.toArray(), (rs) -> {
            Long roleId = rs.getLong("role_id");
            PermissionsResponse perm = new PermissionsResponse();
            perm.setPermissionId(rs.getLong("permission_id"));
            perm.setName(rs.getString("permission_name"));

            result.computeIfAbsent(roleId, k -> new HashSet<>()).add(perm);
        });

        return result;
    }
}
