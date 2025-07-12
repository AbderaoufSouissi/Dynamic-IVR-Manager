package com._CServices.IVR_api.dao;

import com._CServices.IVR_api.entity.Permissions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionsRepository extends JpaRepository<Permissions,Long>{
    Boolean existsByName(String name);

    Permissions findByName(String name);

    Permissions findByDescription(String description);
}
