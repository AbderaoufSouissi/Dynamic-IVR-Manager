package com._CServices.IVR_api.dao;

import com._CServices.IVR_api.entity.Audit;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface AuditRepository extends JpaRepository<Audit, Long>, JpaSpecificationExecutor<Audit> {


    @Query(value = """
    SELECT COUNT(*) FROM general_audit 
    WHERE (:auditId IS NULL OR audit_id = :auditId)
      AND (:userId IS NULL OR user_id = :userId)
      AND (:entityId IS NULL OR entity_id = :entityId)
      AND (:msisdn IS NULL OR msisdn = :msis    dn)
      AND (:actionType IS NULL OR UPPER(action_type) = UPPER(:actionType))
      AND (:entityType IS NULL OR UPPER(entity_type) = UPPER(:entityType))
      AND (:startTimestamp IS NULL OR action_time_stamp >= :startTimestamp)
      AND (:endTimestamp IS NULL OR action_time_stamp <= :endTimestamp)
    """, nativeQuery = true)
    long countAuditsWithFilters(
            @Param("auditId") Long auditId,
            @Param("userId") Long userId,
            @Param("entityId") Long entityId,
            @Param("msisdn") String msisdn,
            @Param("actionType") String actionType,
            @Param("entityType") String entityType,
            @Param("startTimestamp") LocalDateTime startTimestamp,
            @Param("endTimestamp") LocalDateTime endTimestamp
    );

}
