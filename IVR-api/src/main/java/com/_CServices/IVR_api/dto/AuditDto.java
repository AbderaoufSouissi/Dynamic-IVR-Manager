package com._CServices.IVR_api.dto;


import lombok.*;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuditDto {
    private Long auditId;
    private Long userId;
    private String actionType;
    private String entityType;
    private Long entityId;
    private LocalDateTime actionTimestamp;


}
