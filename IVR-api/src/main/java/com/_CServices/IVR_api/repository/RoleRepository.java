package com._CServices.IVR_api.repository;

import com._CServices.IVR_api.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>, CustomRoleRepository {
    Role findByName(String roleName);
}
