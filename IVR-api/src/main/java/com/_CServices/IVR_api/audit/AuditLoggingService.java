package com._CServices.IVR_api.audit;

import com._CServices.IVR_api.dao.AuditRepository;
import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.entity.Audit;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.security.CurrentUserProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

import static com._CServices.IVR_api.constant.Constants.SYSTEM_ID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuditLoggingService {

    private final AuditRepository auditRepository;
    private final UserRepository userRepository;
    private final CurrentUserProvider currentUserProvider;

    @Transactional
    public void logAction(String actionType, String entityType, Long entityId) {
        log.info("inside logAction()");
        final User user;

        if (Objects.equals(actionType, ActionType.FORGET_PASSWORD.toString()) ||
                Objects.equals(actionType, ActionType.RESET_PASSWORD.toString())) {

            user = userRepository.findById(SYSTEM_ID)
                    .orElseThrow(() -> new ResourceNotFoundException("SYSTEM USER NOT FOUND"));
        } else {
            user = currentUserProvider.getCurrentLoggedInUser();
        }



        Audit auditLog = Audit.builder()
                .user(user)
                .actionType(actionType)
                .entityType(entityType)
                .entityId(entityId)
                .build();

        auditRepository.save(auditLog);
    }
}
