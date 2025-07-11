package com._CServices.IVR_api.dto;

import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import lombok.*;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuditDto {
    private Long auditId;
    private Long userId;
    private ActionType actionType;
    private EntityType entityType;
    private Long entityId;
    private LocalDateTime actionTimestamp;


}
