package com._CServices.IVR_api.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "general_audit")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SequenceGenerator(
        name = "shared_seq_generator",      // Internal name used by Hibernate
        sequenceName = "shared_id_seq",     // Actual database sequence name
        allocationSize = 1,// Adjust based on performance needs
        initialValue = 0
)
public class Audit{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shared_seq_generator")
    @Column(name = "audit_id",nullable = false)
    private Long id;

    @Column(nullable = false, updatable = false)
    private String actionType;


    @Column(nullable = true)
    private String msisdn;

    private LocalDateTime actionTimeStamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String entityType;


    private Long entityId;



    @PrePersist
    protected void onCreate() {
        actionTimeStamp = LocalDateTime.now();
    }



}