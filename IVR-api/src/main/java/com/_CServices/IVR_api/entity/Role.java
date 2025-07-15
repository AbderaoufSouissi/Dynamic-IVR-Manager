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
@Table(name = "ROLES")
@SequenceGenerator(
        name = "shared_seq_generator",      // Internal name used by Hibernate
        sequenceName = "shared_id_seq",     // Actual database sequence name
        allocationSize = 1,// Adjust based on performance needs
        initialValue = 0
)
public class Role extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shared_seq_generator")
    @Column(name = "role_id")
    private Long id;
    @Column(name = "role_name", nullable = false, unique = true, length = 50)
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "ROLE_PERMISSIONS",
            joinColumns = @JoinColumn(
                    name = "role_id",
                    referencedColumnName = "role_id",
                    foreignKey = @ForeignKey(name = "fk_role_permissions_role")
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "permission_id",
                    referencedColumnName = "permission_id",
                    foreignKey = @ForeignKey(name = "fk_role_permissions_permission")
            )
    )
    @Builder.Default
    private Set<Permissions> permissions = new HashSet<>();






    public void addPermission(Permissions permission) {
        this.permissions.add(permission);
        permission.getRoles().add(this);
    }

    public void addPermissions(Set<Permissions> permissions) {
        permissions.forEach(this::addPermission);
    }

    public void removePermission(Permissions permission) {
        this.permissions.remove(permission);
        permission.getRoles().remove(this);
    }

    public void removePermissions(Set<Permissions> permissions) {
        permissions.forEach(this::removePermission);
    }

    public void clearPermissions() {
        this.permissions.forEach(permission -> permission.getRoles().remove(this));
        this.permissions.clear();
    }


}
