package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.AuditRepository;
import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.dto.AuditDto;
import com._CServices.IVR_api.dto.UserDto;
import com._CServices.IVR_api.entity.Audit;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.mapper.AuditMapper;
import com._CServices.IVR_api.service.AuditService;
import com._CServices.IVR_api.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class AuditServiceImpl implements AuditService {


    private final AuditRepository auditRepository;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final AuditMapper auditMapper;

    public void logAction(String actionType, String entityType, Long entityId) {
        final User loggedInUser = authService.getCurrentLoggedInUser();
        log.info("inside logAction()");

        Audit auditLog = Audit.builder()
                .user(loggedInUser)
                .actionType(actionType)
                .entityType(entityType)
                .entityId(entityId)
                .build();

        auditRepository.save(auditLog);
    }

    @Override
    public List<AuditDto> getAllAudits() {
        log.info("inside getAllAudits()");
        List<Audit> audits = auditRepository.findAll();
        List<AuditDto> auditDtos = audits.stream()
                .map(audit -> auditMapper.toDto(audit))
                .toList();

        return auditDtos;
    }

    @Override
    public List<AuditDto> getAuditsByEntityType(EntityType entityType) {
        log.info("inside getAuditsByEntityType()");
        List<Audit> audits = auditRepository.findByEntityType(entityType);
        List<AuditDto> auditDtos = audits.stream()
                .map(audit -> auditMapper.toDto(audit))
                .toList();
        return auditDtos;
    }

    @Override
    public List<AuditDto> getAuditsByActionType(ActionType actionType) {
        log.info("inside getAuditsByActionType()");
        List<Audit> audits = auditRepository.findAllByActionType(actionType);
        List<AuditDto> auditDtos = audits.stream()
                .map(audit -> auditMapper.toDto(audit))
                .toList();
        return auditDtos;
    }

    @Override
    public List<AuditDto> getAuditsByEntityTypeAndActionType(EntityType entityType, ActionType actionType) {
        log.info("inside getAuditsByEntityTypeAndActionType()");
        List<Audit> audits = auditRepository.findAllByEntityTypeAndActionType(entityType, actionType);
        List<AuditDto> auditDtos = audits.stream()
                .map(audit -> auditMapper.toDto(audit))
                .toList();
        return auditDtos;
    }

    @Override
    public List<AuditDto> getAuditsByDate(LocalDate date) {
        if (date == null) {
            throw new IllegalArgumentException("Date cannot be null");
        }

        // Convert LocalDate to start and end of day
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();

        // Fetch entities
        List<Audit> audits = auditRepository.findByActionTimeStampBetween(startOfDay, endOfDay);
        List<AuditDto> auditDtos = audits.stream()
                .map(audit -> auditMapper.toDto(audit))
                .toList();
        return auditDtos;
    }

    @Override
    public AuditDto getAuditById(Long id) {
        Audit audit = auditRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Audit record with id: "+ id +" not found"));
        return auditMapper.toDto(audit);
    }
}
