package com._CServices.IVR_api.entity;

import com._CServices.IVR_api.domain.RequestContext;
import com._CServices.IVR_api.enumeration.Action;
import com._CServices.IVR_api.exception.ApiException;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "audit")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Audit extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "action_type", nullable = false, updatable = false, length = 50)
    private Action actionType;

    @Column(name = "msisdn", nullable = false, updatable = false, length = 8)
    private String msisdn;

    @Column(name = "entity_type", length = 100)
    private String entityType;

    @Column(name = "entity_id")
    private Long entityId;


    @PrePersist
    protected void onCreate() {
        Long userId = RequestContext.getUserId();
        if (userId == null) {
            throw new ApiException("Cannot persist audit entry when user ID is null");
        }
        setCreatedBy(userId);
        setUpdatedBy(userId);
    }

    @PreUpdate
    protected void onUpdate() {
        Long userId = RequestContext.getUserId();
        if (userId == null) {
            throw new ApiException("Cannot update audit entry when user ID is null");
        }
        setUpdatedBy(userId);
    }
}