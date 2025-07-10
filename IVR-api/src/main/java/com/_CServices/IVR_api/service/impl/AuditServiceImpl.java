package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.AuditRepository;
import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.entity.Audit;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class AuditServiceImpl{

    private final AuditRepository auditRepository;
    private final UserRepository userRepository;

    public void logAction(User user, ActionType actionType, EntityType entityType, Long entityId) {
        log.info("inside logAction()");

        Audit auditLog = Audit.builder()
                .user(user)
                .actionType(actionType)
                .entityType(entityType)
                .entityId(entityId)
                .build();

        auditRepository.save(auditLog);
    }
}
