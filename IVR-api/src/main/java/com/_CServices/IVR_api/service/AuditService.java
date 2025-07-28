package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.response.AuditResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;


public interface AuditService {
    AuditResponse getAuditById(@NotNull Long id);
    Page<AuditResponse> getAuditsWithFilters(Long auditId,
                                             Long userId,
                                             String actionType,
                                             String entityType,   // <‑‑ NEW
                                             LocalDate actionDate,
                                             String sortBy,
                                             String sortDir,
                                             Pageable pageable);


}

