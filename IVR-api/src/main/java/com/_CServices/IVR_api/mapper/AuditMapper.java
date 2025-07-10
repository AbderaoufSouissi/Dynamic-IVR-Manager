package com._CServices.IVR_api.mapper;

import com._CServices.IVR_api.dto.AuditDto;
import com._CServices.IVR_api.entity.Audit;
import org.springframework.stereotype.Component;

@Component
public class AuditMapper {
    public AuditDto toDto(Audit audit) {
//        MAPPER WITH VERIFICATION
//        AuditDto auditDto = new AuditDto();
//        if(audit.getId() != null) auditDto.setAuditId(audit.getId());
//        if(audit.getUser() != null) auditDto.setUserId(audit.getUser().getId());
//        if(audit.getEntityId() != null) auditDto.setEntityId(audit.getEntityId());
//        if(audit.getEntityType() != null) auditDto.setEntityType(audit.getEntityType());
//        if(audit.getActionType() !=null) auditDto.setActionType(audit.getActionType());
//        if(audit.getActionTimeStamp() != null) auditDto.setActionTimestamp(audit.getActionTimeStamp());
//        return auditDto;

        return AuditDto.builder()
                .auditId(audit.getId())
                .userId(audit.getUser().getId())
                .actionType(audit.getActionType())
                .entityId(audit.getEntityId())
                .entityType(audit.getEntityType())
                .actionTimestamp(audit.getActionTimeStamp())
                .build();

    }

}
