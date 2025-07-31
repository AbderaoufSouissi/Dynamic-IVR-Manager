package com._CServices.IVR_api.dao;

import com._CServices.IVR_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    User findByUsername(String username);;

    // Alternative if the above doesn't work due to entity relationship
    @Query("SELECT u FROM User u JOIN u.role r WHERE r.id = :roleId")
    List<User> findUsersWithRole(@Param("roleId") Long roleId);


}

