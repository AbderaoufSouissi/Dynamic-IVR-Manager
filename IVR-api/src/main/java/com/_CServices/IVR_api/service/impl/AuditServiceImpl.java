package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.AuditRepository;

import com._CServices.IVR_api.dto.response.AuditResponse;
import com._CServices.IVR_api.entity.Audit;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.mapper.AuditMapper;
import com._CServices.IVR_api.service.AuditService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import com._CServices.IVR_api.utils.SortUtils;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;



@Service
@RequiredArgsConstructor
@Slf4j
public class AuditServiceImpl implements AuditService {


    private final AuditRepository auditRepository;
    private final AuditMapper auditMapper;
    private final EntityManager entityManager;







    @Override
    public AuditResponse getAuditById(Long id) {
        Audit audit = auditRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Audit record with id: "+ id +" not found"));
        return auditMapper.toDto(audit);
    }

    @Override
    public Page<AuditResponse> getAuditsWithFilters(Long auditId,
                                                    Long userId,
                                                    Long entityId,
                                                    String msisdn,
                                                    String actionType,
                                                    String entityType,
                                                    LocalDate actionDate,
                                                    String sortBy,
                                                    String sortDir,
                                                    Pageable pageable) {
        log.info("inside getAuditsWithFilters");

        int[] bounds = getRowBounds(pageable);
        int startRow = bounds[0];
        int endRow = bounds[1];


        LocalDateTime startTimestamp = null;
        LocalDateTime endTimestamp = null;
        if (actionDate != null) {
            startTimestamp = actionDate.atStartOfDay();
            endTimestamp = actionDate.atTime(LocalTime.MAX);
        }

        // Use SortUtils for safe sorting
        String sanitizedSortField = SortUtils.sanitizeSortField(
                sortBy != null ? sortBy.toLowerCase() : "",
                SortUtils.getAllowedAuditFields(),
                "audit_id"
        );
        String sanitizedSortDir = SortUtils.sanitizeSortDirection(sortDir);

        String normalizedActionType = (actionType != null) ? actionType.toUpperCase() : null;
        String normalizedEntityType = (entityType != null) ? entityType.toUpperCase() : null;

        String sql = String.format("""
    SELECT * FROM (
        SELECT a.*, ROWNUM rn FROM (
            SELECT * FROM general_audit
            WHERE (:auditId IS NULL OR audit_id = :auditId)
              AND (:userId IS NULL OR user_id = :userId)
              AND (:entityId IS NULL OR entity_id = :entityId)
              AND (:msisdn IS NULL OR msisdn = :msisdn)
              AND (:actionType IS NULL OR UPPER(action_type) LIKE UPPER(:actionType) || '%%')
              AND (:entityType IS NULL OR UPPER(entity_type) LIKE UPPER(:entityType) || '%%')
              AND (:startTimestamp IS NULL OR action_time_stamp >= :startTimestamp)
              AND (:endTimestamp IS NULL OR action_time_stamp <= :endTimestamp)
            ORDER BY %s %s
        ) a WHERE ROWNUM <= :endRow
    ) WHERE rn > :startRow
    """, sanitizedSortField, sanitizedSortDir);

        Query query = entityManager.createNativeQuery(sql, Audit.class)
                .setParameter("auditId", auditId)
                .setParameter("userId", userId)
                .setParameter("entityId", entityId)
                .setParameter("msisdn", msisdn)
                .setParameter("actionType", normalizedActionType)
                .setParameter("entityType", normalizedEntityType)
                .setParameter("startTimestamp", startTimestamp)
                .setParameter("endTimestamp", endTimestamp)
                .setParameter("startRow", startRow)
                .setParameter("endRow", endRow);

        List<Audit> audits = query.getResultList();

        long total = auditRepository.countAuditsWithFilters(
                auditId, userId, entityId, msisdn, normalizedActionType, normalizedEntityType, startTimestamp, endTimestamp
        );

        List<AuditResponse> auditResponses = audits.stream()
                .map(auditMapper::toDto)
                .collect(Collectors.toList());

        return new PageImpl<>(auditResponses, pageable, total);
    }





    private int[] getRowBounds(Pageable pageable) {
        int startRow = (int) pageable.getOffset(); // page * size
        int endRow = startRow + pageable.getPageSize();
        return new int[]{startRow, endRow};
    }




}
