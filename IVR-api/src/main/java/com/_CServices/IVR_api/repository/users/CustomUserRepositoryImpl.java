package com._CServices.IVR_api.repository.users;

import com._CServices.IVR_api.dto.response.UserResponse;
import com._CServices.IVR_api.filter.UserFilter;
import lombok.RequiredArgsConstructor;

import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomUserRepositoryImpl implements CustomUserRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public List<UserResponse> findUsersWithFilters(UserFilter filter, String sortBy, String sortDir, int offset, int limit) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT * FROM ( ")
                .append("  SELECT u.*, r.role_name, ")
                .append("         creator.username AS created_by_username, ")
                .append("         updater.username AS updated_by_username, ")
                .append("         ROWNUM rn ")
                .append("  FROM app_users u ")
                .append("  LEFT JOIN roles r ON u.role_id = r.role_id ")
                .append("  LEFT JOIN app_users creator ON u.created_by_id = creator.user_id ")
                .append("  LEFT JOIN app_users updater ON u.updated_by_id = updater.user_id ")
                .append("  WHERE 1 = 1 ");

        if (filter.getId() != null) {
            sql.append(" AND u.user_id = ? ");
            params.add(filter.getId());
        }
        if (filter.getFirstName() != null) {
            sql.append(" AND LOWER(u.first_name) LIKE ? ");
            params.add("%" + filter.getFirstName().toLowerCase() + "%");
        }
        if (filter.getLastName() != null) {
            sql.append(" AND LOWER(u.last_name) LIKE ? ");
            params.add("%" + filter.getLastName().toLowerCase() + "%");
        }
        if (filter.getUsername() != null) {
            sql.append(" AND LOWER(u.username) LIKE ? ");
            params.add("%" + filter.getUsername().toLowerCase() + "%");
        }
        if (filter.getEmail() != null) {
            sql.append(" AND LOWER(u.email) LIKE ? ");
            params.add("%" + filter.getEmail().toLowerCase() + "%");
        }
        if (filter.getActive() != null) {
            sql.append(" AND u.is_active = ? ");
            params.add(filter.getActive());
        }
        if (filter.getRoleName() != null) {
            sql.append(" AND LOWER(r.role_name) LIKE ? ");
            params.add("%" + filter.getRoleName().toLowerCase() + "%");
        }
        if (filter.getCreatedBy() != null) {
            sql.append(" AND LOWER(creator.username) LIKE ? ");
            params.add("%" + filter.getCreatedBy().toLowerCase() + "%");
        }
        if (filter.getUpdatedBy() != null) {
            sql.append(" AND LOWER(updater.username) LIKE ? ");
            params.add("%" + filter.getUpdatedBy().toLowerCase() + "%");
        }
        if (filter.getCreatedAt() != null) {
            sql.append(" AND u.created_at BETWEEN ? AND ? ");
            params.add(filter.getCreatedAt().atStartOfDay());
            params.add(filter.getCreatedAt().atTime(LocalTime.MAX));
        }
        if (filter.getUpdatedAt() != null) {
            sql.append(" AND u.updated_at BETWEEN ? AND ? ");
            params.add(filter.getUpdatedAt().atStartOfDay());
            params.add(filter.getUpdatedAt().atTime(LocalTime.MAX));
        }

        sql.append("  ORDER BY u.").append(sortBy).append(" ").append(sortDir);
        sql.append(") WHERE rn > ? AND rn <= ?");

        params.add(offset);
        params.add(offset + limit);

        return jdbcTemplate.query(sql.toString(), params.toArray(), userResponseRowMapper);
    }

    @Override
    public long countUsersWithFilters(UserFilter filter) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT COUNT(*) ")
                .append("FROM app_users u ")
                .append("LEFT JOIN roles r ON u.role_id = r.role_id ")
                .append("LEFT JOIN app_users creator ON u.created_by_id = creator.user_id ")
                .append("LEFT JOIN app_users updater ON u.updated_by_id = updater.user_id ")
                .append("WHERE 1 = 1 ");

        if (filter.getId() != null) {
            sql.append(" AND u.user_id = ? ");
            params.add(filter.getId());
        }
        if (filter.getFirstName() != null) {
            sql.append(" AND LOWER(u.first_name) LIKE ? ");
            params.add("%" + filter.getFirstName().toLowerCase() + "%");
        }
        if (filter.getLastName() != null) {
            sql.append(" AND LOWER(u.last_name) LIKE ? ");
            params.add("%" + filter.getLastName().toLowerCase() + "%");
        }
        if (filter.getUsername() != null) {
            sql.append(" AND LOWER(u.username) LIKE ? ");
            params.add("%" + filter.getUsername().toLowerCase() + "%");
        }
        if (filter.getEmail() != null) {
            sql.append(" AND LOWER(u.email) LIKE ? ");
            params.add("%" + filter.getEmail().toLowerCase() + "%");
        }
        if (filter.getActive() != null) {
            sql.append(" AND u.is_active = ? ");
            params.add(filter.getActive());
        }
        if (filter.getRoleName() != null) {
            sql.append(" AND LOWER(r.role_name) LIKE ? ");
            params.add("%" + filter.getRoleName().toLowerCase() + "%");
        }
        if (filter.getCreatedBy() != null) {
            sql.append(" AND LOWER(creator.username) LIKE ? ");
            params.add("%" + filter.getCreatedBy().toLowerCase() + "%");
        }
        if (filter.getUpdatedBy() != null) {
            sql.append(" AND LOWER(updater.username) LIKE ? ");
            params.add("%" + filter.getUpdatedBy().toLowerCase() + "%");
        }
        if (filter.getCreatedAt() != null) {
            sql.append(" AND u.created_at BETWEEN ? AND ? ");
            params.add(filter.getCreatedAt().atStartOfDay());
            params.add(filter.getCreatedAt().atTime(LocalTime.MAX));
        }
        if (filter.getUpdatedAt() != null) {
            sql.append(" AND u.updated_at BETWEEN ? AND ? ");
            params.add(filter.getUpdatedAt().atStartOfDay());
            params.add(filter.getUpdatedAt().atTime(LocalTime.MAX));
        }

        return jdbcTemplate.queryForObject(sql.toString(), params.toArray(), Long.class);
    }

    private final RowMapper<UserResponse> userResponseRowMapper = (rs, rowNum) -> {
        UserResponse user = new UserResponse();
        user.setUserId(rs.getLong("user_id"));
        user.setFirstName(rs.getString("first_name"));
        user.setLastName(rs.getString("last_name"));
        user.setUsername(rs.getString("username"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password")); // Optional, depending on what you expose
        user.setActive(rs.getBoolean("is_active"));
        user.setRoleName(rs.getString("role_name"));
        user.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        user.setUpdatedAt(rs.getTimestamp("updated_at").toLocalDateTime());

        // Use joined values for createdBy/updatedBy
        user.setCreatedBy(rs.getString("created_by_username"));
        user.setUpdatedBy(rs.getString("updated_by_username"));

        return user;
    };

}
