package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.AuditDto;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.service.AuditService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/audits")
@RequiredArgsConstructor
public class AuditController {

    private final AuditService auditService;

    @GetMapping
    public ResponseEntity<List<AuditDto>> getAllAudits() {
        return ResponseEntity.ok(auditService.getAllAudits());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuditDto> getAuditById(@PathVariable Long id) {
        return ResponseEntity.ok(auditService.getAuditById(id));
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<AuditDto>> getAuditsByDate(
            @NotNull @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(auditService.getAuditsByDate(date));
    }

    @GetMapping("/by-action-type")
    public ResponseEntity<List<AuditDto>> getAuditsByActionType(
            @NotNull @RequestParam ActionType actionType) {
        return ResponseEntity.ok(auditService.getAuditsByActionType(actionType));
    }

    @GetMapping("/by-entity-type")
    public ResponseEntity<List<AuditDto>> getAuditsByEntityType(
            @NotNull @RequestParam EntityType entityType) {
        return ResponseEntity.ok(auditService.getAuditsByEntityType(entityType));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<AuditDto>> getAuditsByEntityAndActionType(
            @NotNull @RequestParam EntityType entityType,
            @NotNull @RequestParam ActionType actionType) {
        return ResponseEntity.ok(auditService.getAuditsByEntityTypeAndActionType(entityType, actionType));
    }
}
