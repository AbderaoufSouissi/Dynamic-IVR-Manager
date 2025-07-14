package com._CServices.IVR_api.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "PERMISSIONS")
@SequenceGenerator(
        name = "shared_seq_generator",      // Internal name used by Hibernate
        sequenceName = "shared_id_seq",     // Actual database sequence name
        allocationSize = 1                  // Adjust based on performance needs
)
public class Permissions extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shared_seq_generator")
    @Column(name = "permission_id")
    private Long id;

    @Column(name="permission_name",nullable = false, unique = true)
    private String name;

    @Builder.Default
    @ManyToMany(mappedBy = "permissions", fetch = FetchType.LAZY)
    private Set<Role> roles = new HashSet<>();

    private String description;

}
