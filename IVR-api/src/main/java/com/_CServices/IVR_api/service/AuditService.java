package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.AuditDto;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;


public interface AuditService {
    void logAction(String actionType, String entityType, Long entityId);
    AuditDto getAuditById(@NotNull Long id);

    Page<AuditDto> getAuditsWithFilters(Long auditId,
                                        Long userId,
                                        String actionType,
                                        String entityType,   // <‑‑ NEW
                                        LocalDate actionDate,
                                        String sortBy,
                                        String sortDir,
                                        Pageable pageable);


}

