package com._CServices.IVR_api.repository;

import com._CServices.IVR_api.dto.response.AuditResponse;
import com._CServices.IVR_api.filter.AuditFilter;

import java.util.List;

public interface CustomAuditRepository {
    List<AuditResponse> findAuditsWithFilters(AuditFilter filter, String sortBy, String sortDir, int offset, int limit);
    long countAuditsWithFilters(AuditFilter filter);
}
