package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.repository.AuditRepository;

import com._CServices.IVR_api.dto.response.AuditResponse;
import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.entity.Audit;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.filter.AuditFilter;
import com._CServices.IVR_api.mapper.AuditMapper;
import com._CServices.IVR_api.service.AuditService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import com._CServices.IVR_api.utils.SortUtils;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class AuditServiceImpl implements AuditService {


    private final AuditRepository auditRepository;
    private final AuditMapper auditMapper;



    @Override
    public PagedResponse<AuditResponse> getFilteredAudits(
            AuditFilter filter,
            Pageable pageable,
            String sortBy,
            String sortDir
    ) {
        // Sanitize sorting inputs
        String safeSortBy = SortUtils.sanitizeSortField(
                sortBy,
                SortUtils.getAllowedAuditFields(),
                "audit_id"
        );
        String safeSortDir = SortUtils.sanitizeSortDirection(sortDir);

        int offset = pageable.getPageNumber() * pageable.getPageSize();
        int limit = pageable.getPageSize();

        List<AuditResponse> content = auditRepository.findAuditsWithFilters(
                filter,
                safeSortBy,
                safeSortDir,
                offset,
                limit
        );

        long total = auditRepository.countAuditsWithFilters(filter);

        return PagedResponse.<AuditResponse>builder()
                .content(content)
                .page(pageable.getPageNumber())
                .size(pageable.getPageSize())
                .totalElements(total)
                .totalPages((int) Math.ceil((double) total / pageable.getPageSize()))
                .build();
    }


    @Override
    public AuditResponse getAuditById(Long id) {
        Audit audit = auditRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Audit record with id: "+ id +" not found"));
        return auditMapper.toDto(audit);
    }





}
