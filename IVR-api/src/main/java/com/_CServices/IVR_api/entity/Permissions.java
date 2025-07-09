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
@Table(name = "PERMISSIONS")
public class Permissions extends Audit implements GrantedAuthority {

    @Column(name="permission_name",nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "permissions", fetch = FetchType.LAZY)
    private Set<Role> roles = new HashSet<>();

    @Override
    public String getAuthority() {
        return this.name;
    }
}
