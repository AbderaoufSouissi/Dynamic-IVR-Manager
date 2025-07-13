package com._CServices.IVR_api.dao;

import com._CServices.IVR_api.dto.UserDto;
import com._CServices.IVR_api.entity.Role;
import com._CServices.IVR_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByUsername(String username);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.email = :email")
    boolean existsByEmail(String email);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.username = :username")
    boolean existsByUsername(String username);

    void deleteByEmail(String email);


    List<User> findAllByActive(boolean active);

    List<User> findAllByRole(Role role);
}
