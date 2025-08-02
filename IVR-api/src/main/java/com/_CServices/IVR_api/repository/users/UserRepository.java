package com._CServices.IVR_api.repository.users;

import com._CServices.IVR_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long>, CustomUserRepository {

    User findByEmail(String email);
    User findByUsername(String username);;
    @Query("SELECT u FROM User u JOIN u.role r WHERE r.id = :roleId")
    List<User> findUsersWithRole(@Param("roleId") Long roleId);

    @Query(value = "SELECT COUNT(*) FROM APP_USERS WHERE IS_ACTIVE = :active", nativeQuery = true)
    long countByActive(@Param("active") int active);
    
}

