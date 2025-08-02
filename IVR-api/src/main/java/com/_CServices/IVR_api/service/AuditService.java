package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.response.AuditResponse;
import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.filter.AuditFilter;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;


public interface AuditService {
    PagedResponse<AuditResponse> getFilteredAudits(
            AuditFilter filter,
            Pageable pageable,
            String sortBy,
            String sortDir
    );
    AuditResponse getAuditById(@NotNull Long id);



}

