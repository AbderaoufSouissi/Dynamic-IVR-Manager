package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.response.AuditResponse;
import com._CServices.IVR_api.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;


@RestController
@RequestMapping("/api/v1/audits")
@RequiredArgsConstructor
public class AuditController {

    private final AuditService auditService;

    @GetMapping
    public ResponseEntity<Page<AuditResponse>> getAudits(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Long entityId,
            @RequestParam(required = false) String msisdn,
            @RequestParam(required = false) String action,
            @RequestParam(required = false) String entity,
            @RequestParam(required = false) LocalDate date,

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "audit_id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ?
                Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<AuditResponse> audits = auditService.getAuditsWithFilters(id,
                userId,
                entityId,
                 msisdn,
                action,
                entity,
                date,
                sortBy,
                sortDir,
                pageable
        );

        return ResponseEntity.ok(audits);
    }



    @GetMapping("/{id}")
    public ResponseEntity<AuditResponse> getAuditById(@PathVariable Long id) {
        return ResponseEntity.ok(auditService.getAuditById(id));
    }







}
