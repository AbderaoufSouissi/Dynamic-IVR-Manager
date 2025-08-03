package com._CServices.IVR_api.filter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditFilter {
    private Long id;
    private Long userId;
    private String actionType;
    private String entityType;
    private Long entityId;
    private String msisdn;
    private LocalDate date;
}
