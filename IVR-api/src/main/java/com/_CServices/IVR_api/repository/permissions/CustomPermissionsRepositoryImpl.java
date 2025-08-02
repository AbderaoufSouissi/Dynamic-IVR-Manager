package com._CServices.IVR_api.repository.permissions;

import com._CServices.IVR_api.dto.response.PermissionsResponse;
import com._CServices.IVR_api.filter.PermissionsFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomPermissionsRepositoryImpl implements CustomPermissionsRepository {

    private final JdbcTemplate jdbcTemplate;


    @Override
    public List<PermissionsResponse> findPermissionsWithFilters(
            PermissionsFilter filter, String sortBy, String sortDir, int offset, int limit
    ) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT * FROM ( ")
                .append("  SELECT p.*, ")
                .append("         NVL(creator.username, '') AS created_by_username, ")
                .append("         NVL(updater.username, '') AS updated_by_username, ")
                .append("         ROWNUM rn ")
                .append("  FROM permissions p ")
                .append("  LEFT JOIN app_users creator ON p.created_by_id = creator.user_id ")
                .append("  LEFT JOIN app_users updater ON p.updated_by_id = updater.user_id ")
                .append("  WHERE 1 = 1 ");

        if (filter.getId() != null) {
            sql.append(" AND p.permission_id = ? ");
            params.add(filter.getId());
        }
        if (filter.getName() != null) {
            sql.append(" AND LOWER(p.permission_name) LIKE ? ");
            params.add("%" + filter.getName().toLowerCase() + "%");
        }
        if (filter.getCreatedBy() != null) {
            sql.append(" AND LOWER(NVL(creator.username, '')) LIKE ? ");
            params.add("%" + filter.getCreatedBy().toLowerCase() + "%");
        }
        if (filter.getUpdatedBy() != null) {
            sql.append(" AND LOWER(NVL(updater.username, '')) LIKE ? ");
            params.add("%" + filter.getUpdatedBy().toLowerCase() + "%");
        }
        if (filter.getCreatedAt() != null) {
            sql.append(" AND p.created_at BETWEEN ? AND ? ");
            params.add(filter.getCreatedAt().atStartOfDay());
            params.add(filter.getCreatedAt().atTime(LocalTime.MAX));
        }
        if (filter.getUpdatedAt() != null) {
            sql.append(" AND p.updated_at BETWEEN ? AND ? ");
            params.add(filter.getUpdatedAt().atStartOfDay());
            params.add(filter.getUpdatedAt().atTime(LocalTime.MAX));
        }

        sql.append("  ORDER BY p.").append(sortBy).append(" ").append(sortDir);
        sql.append(") WHERE rn > ? AND rn <= ?");

        params.add(offset);
        params.add(offset + limit);

        return jdbcTemplate.query(sql.toString(), params.toArray(), rowMapper);
    }

    @Override
    public long countPermissionsWithFilters(PermissionsFilter filter) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT COUNT(*) FROM permissions p ")
                .append("LEFT JOIN app_users creator ON p.created_by_id = creator.user_id ")
                .append("LEFT JOIN app_users updater ON p.updated_by_id = updater.user_id ")
                .append("WHERE 1 = 1 ");

        if (filter.getId() != null) {
            sql.append(" AND p.permission_id = ? ");
            params.add(filter.getId());
        }
        if (filter.getName() != null) {
            sql.append(" AND LOWER(p.permission_name) LIKE ? ");
            params.add("%" + filter.getName().toLowerCase() + "%");
        }
        if (filter.getCreatedBy() != null) {
            sql.append(" AND LOWER(NVL(creator.username, '')) LIKE ? ");
            params.add("%" + filter.getCreatedBy().toLowerCase() + "%");
        }
        if (filter.getUpdatedBy() != null) {
            sql.append(" AND LOWER(NVL(updater.username, '')) LIKE ? ");
            params.add("%" + filter.getUpdatedBy().toLowerCase() + "%");
        }
        if (filter.getCreatedAt() != null) {
            sql.append(" AND p.created_at BETWEEN ? AND ? ");
            params.add(filter.getCreatedAt().atStartOfDay());
            params.add(filter.getCreatedAt().atTime(LocalTime.MAX));
        }
        if (filter.getUpdatedAt() != null) {
            sql.append(" AND p.updated_at BETWEEN ? AND ? ");
            params.add(filter.getUpdatedAt().atStartOfDay());
            params.add(filter.getUpdatedAt().atTime(LocalTime.MAX));
        }

        return jdbcTemplate.queryForObject(sql.toString(), params.toArray(), Long.class);
    }


    private final RowMapper<PermissionsResponse> rowMapper = (rs, rowNum) -> {
        PermissionsResponse permissions = new PermissionsResponse();
        permissions.setPermissionId(rs.getLong("permission_id"));
        permissions.setName(rs.getString("permission_name"));
        permissions.setDescription(rs.getString("description"));
        permissions.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        permissions.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());
        permissions.setCreatedBy(rs.getString("created_by_username"));
        permissions.setUpdatedBy(rs.getString("updated_by_username"));
        return permissions;
    };
}
