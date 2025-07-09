package com._CServices.IVR_api.entity;


import com._CServices.IVR_api.domain.RequestContext;
import com._CServices.IVR_api.exception.ApiException;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;


@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt","updatedAt"}, allowGetters = true)
public abstract class Audit {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_generator")
    @SequenceGenerator(name="id_generator", sequenceName="id_seq", allocationSize=1)
    @Column(name = "id",updatable = false)
    private Long id;

    @NotNull
    private Long createdBy;

    @NotNull
    private Long updatedBy;
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;





    @PrePersist
    protected void onCreate() {
        Long userId = RequestContext.getUserId();
        //RECUPERER L'ID DU USER ACTUEL
        //Long userId = 1L;

        if (userId == null) {
            throw new ApiException("Cannot persist entity when user ID is null");
        }
        setCreatedBy(userId);
        setUpdatedBy(userId);
    }

    @PreUpdate
    protected void onUpdate() {
        //RECUPERER L'ID DU USER ACTUEL
        Long userId = RequestContext.getUserId();
        //Long userId = 1L;

        if (userId == null) {
            throw new ApiException("Cannot update entity when user ID is null");
        }
        setUpdatedBy(userId);
    }




}
