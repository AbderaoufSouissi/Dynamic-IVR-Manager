package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.AuditDto;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public interface AuditService {
    void logAction(User user, String actionType, String entityType, Long entityId);
    List<AuditDto> getAllAudits();
    List<AuditDto> getAuditsByEntityType(@NotNull EntityType entityType);
    List<AuditDto> getAuditsByActionType(@NotNull ActionType actionType);
    List<AuditDto> getAuditsByEntityTypeAndActionType(@NotNull EntityType entityType, @NotNull ActionType actionType);
    List<AuditDto> getAuditsByDate(@NotNull LocalDate date);
    AuditDto getAuditById(@NotNull Long id);
}
