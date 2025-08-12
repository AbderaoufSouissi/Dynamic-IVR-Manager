package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.response.AuditResponse;
import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.filter.AuditFilter;
import com._CServices.IVR_api.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;


@RestController
@RequestMapping("/api/v1/audits")
@RequiredArgsConstructor
public class AuditController {

    private final AuditService auditService;

    @GetMapping
    @PreAuthorize("hasAuthority('read:audits')")
    public ResponseEntity<PagedResponse<AuditResponse>> getAudits(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String actionType,
            @RequestParam(required = false) String entityType,
            @RequestParam(required = false) Long entityId,
            @RequestParam(required = false) String msisdn,
            @RequestParam(required = false) LocalDate date,
            @RequestParam(required = false, defaultValue = "audit_id") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortDir,
            Pageable pageable
    ) {
        AuditFilter filter = AuditFilter.builder()
                .id(id)
                .userId(userId)
                .actionType(actionType)
                .entityType(entityType)
                .entityId(entityId)
                .msisdn(msisdn)
                .date(date)
                .build();

        PagedResponse<AuditResponse> response = auditService
                .getFilteredAudits(filter, pageable, sortBy, sortDir);

        return ResponseEntity.ok(response);
    }


    @PreAuthorize("hasAuthority('read:audits')")
    @GetMapping("/{id}")
    public ResponseEntity<AuditResponse> getAuditById(@PathVariable Long id) {
        return ResponseEntity.ok(auditService.getAuditById(id));
    }







}
