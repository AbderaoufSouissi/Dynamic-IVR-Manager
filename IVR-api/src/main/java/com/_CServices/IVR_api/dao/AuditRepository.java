package com._CServices.IVR_api.dao;

import com._CServices.IVR_api.entity.Audit;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditRepository extends JpaRepository<Audit, Long> {
    List<Audit> findByEntityType(EntityType entityType);
    List<Audit> findAllByEntityTypeAndActionType(EntityType entityType, ActionType actionType);
    List<Audit> findAllByActionType(ActionType actionType);
    List<Audit> findByActionTimeStampBetween(LocalDateTime actionTimeStampAfter, LocalDateTime actionTimeStampBefore);

}
