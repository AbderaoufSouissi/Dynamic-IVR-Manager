package com._CServices.IVR_api.entity;

import com._CServices.IVR_api.enumeration.Action;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "general_audit")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Audit extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, updatable = false, length = 50)
    private Action actionType;

    @Column(nullable = false, updatable = false, length = 8)
    private String msisdn;

    private String entityType;
    private Long entityId;


}