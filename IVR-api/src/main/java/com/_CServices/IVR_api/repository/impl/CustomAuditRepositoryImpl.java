package com._CServices.IVR_api.repository.impl;



import com._CServices.IVR_api.dto.response.AuditResponse;
import com._CServices.IVR_api.filter.AuditFilter;
import com._CServices.IVR_api.repository.CustomAuditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CustomAuditRepositoryImpl implements CustomAuditRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public List<AuditResponse> findAuditsWithFilters(
            AuditFilter filter,
            String sortBy,
            String sortDir,
            int offset,
            int limit
    ) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT * FROM ( ")
                .append("  SELECT a.*, u.username, ROWNUM rn ")
                .append("  FROM general_audit a ")
                .append("  LEFT JOIN app_users u ON a.user_id = u.user_id ")
                .append("  WHERE 1 = 1 ");

        if (filter.getId() != null) {
            sql.append(" AND a.audit_id = ? ");
            params.add(filter.getId());
        }
        if (filter.getUserId() != null) {
            sql.append(" AND a.user_id = ? ");
            params.add(filter.getUserId());
        }
        if (filter.getActionType() != null && !filter.getActionType().isBlank()) {
            sql.append(" AND LOWER(a.action_type) LIKE ? ");
            params.add("%" + filter.getActionType().toLowerCase() + "%");
        }
        if (filter.getEntityType() != null && !filter.getEntityType().isBlank()) {
            sql.append(" AND LOWER(a.entity_type) LIKE ? ");
            params.add("%" + filter.getEntityType().toLowerCase() + "%");
        }
        if (filter.getEntityId() != null) {
            sql.append(" AND a.entity_id = ? ");
            params.add(filter.getEntityId());
        }
        if (filter.getMsisdn() != null && !filter.getMsisdn().isBlank()) {
            sql.append(" AND LOWER(a.msisdn) LIKE ? ");
            params.add("%" + filter.getMsisdn().toLowerCase() + "%");
        }
        if (filter.getDate() != null) {
            sql.append(" AND a.action_time_stamp BETWEEN ? AND ? ");
            params.add(filter.getDate().atStartOfDay());
            params.add(filter.getDate().atTime(LocalTime.MAX));
        }

        sql.append("  ORDER BY a.").append(sortBy).append(" ").append(sortDir);
        sql.append(") WHERE rn > ? AND rn <= ?");

        params.add(offset);
        params.add(offset + limit);

        return jdbcTemplate.query(sql.toString(), params.toArray(), rowMapper);
    }

    @Override
    public long countAuditsWithFilters(AuditFilter filter) {
        StringBuilder sql = new StringBuilder();
        List<Object> params = new ArrayList<>();

        sql.append("SELECT COUNT(*) FROM general_audit a ")
                .append("LEFT JOIN app_users u ON a.user_id = u.user_id ")
                .append("WHERE 1 = 1 ");

        if (filter.getId() != null) {
            sql.append(" AND a.audit_id = ? ");
            params.add(filter.getId());
        }
        if (filter.getUserId() != null) {
            sql.append(" AND a.user_id = ? ");
            params.add(filter.getUserId());
        }
        if (filter.getActionType() != null && !filter.getActionType().isBlank()) {
            sql.append(" AND LOWER(a.action_type) LIKE ? ");
            params.add("%" + filter.getActionType().toLowerCase() + "%");
        }
        if (filter.getEntityType() != null && !filter.getEntityType().isBlank()) {
            sql.append(" AND LOWER(a.entity_type) LIKE ? ");
            params.add("%" + filter.getEntityType().toLowerCase() + "%");
        }
        if (filter.getEntityId() != null) {
            sql.append(" AND a.entity_id = ? ");
            params.add(filter.getEntityId());
        }
        if (filter.getMsisdn() != null && !filter.getMsisdn().isBlank()) {
            sql.append(" AND LOWER(a.msisdn) LIKE ? ");
            params.add("%" + filter.getMsisdn().toLowerCase() + "%");
        }
        if (filter.getDate() != null) {
            sql.append(" AND a.action_time_stamp BETWEEN ? AND ? ");
            params.add(filter.getDate().atStartOfDay());
            params.add(filter.getDate().atTime(LocalTime.MAX));
        }

        return jdbcTemplate.queryForObject(sql.toString(), params.toArray(), Long.class);
    }



    private final RowMapper<AuditResponse> rowMapper = (rs, rowNum) -> {
        AuditResponse audit = new AuditResponse();
        audit.setAuditId(rs.getLong("audit_id"));
        audit.setUserId(rs.getLong("user_id"));
        audit.setActionType(rs.getString("action_type"));
        audit.setEntityType(rs.getString("entity_type"));
        audit.setEntityId(rs.getLong("entity_id"));
        audit.setMsisdn(rs.getString("msisdn"));
        audit.setActionTimestamp(rs.getTimestamp("action_time_stamp").toLocalDateTime());



        return audit;
    };

}

