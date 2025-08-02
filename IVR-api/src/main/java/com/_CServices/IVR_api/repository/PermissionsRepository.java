package com._CServices.IVR_api.repository;

import com._CServices.IVR_api.entity.Permissions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionsRepository extends JpaRepository<Permissions,Long> , CustomPermissionsRepository{
    @Query("SELECT COUNT(p) > 0 FROM Permissions p WHERE p.name = :name")
    boolean existsByName(@Param("name") String name);

    @Query("SELECT p FROM Permissions p WHERE p.name = :name AND ROWNUM = 1")
    Permissions findByName(@Param("name") String name);


    @Query("SELECT p FROM Permissions p WHERE p.description = :description AND ROWNUM = 1")
    Permissions findByDescription(@Param("description") String description);



}
