package com._CServices.IVR_api.entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;


import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "ROLES")
public class Role extends Audit implements GrantedAuthority {

    @Column(name= "role_name", nullable = false, unique = true)
    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "ROLE_PERMISSIONS",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id", referencedColumnName = "id")
    )
    private Set<Permissions> permissions = new HashSet<>();



    @Override
    public String getAuthority() {
        return "ROLE_" + this.name;
    }


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
