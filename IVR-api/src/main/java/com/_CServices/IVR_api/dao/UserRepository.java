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

    User findByUsername(String username);

    @Query(value = """
        SELECT * FROM (
            SELECT u.*, ROWNUM rn FROM (
                SELECT * FROM app_users WHERE is_active = :active ORDER BY user_id
            ) u WHERE ROWNUM <= :endRow
        ) WHERE rn > :startRow
        """, nativeQuery = true)
    List<User> findUsersByActiveStatus(
            @Param("active") boolean active,
            @Param("startRow") int startRow,
            @Param("endRow") int endRow
    );

    @Query(value = """
        SELECT * FROM (
            SELECT u.*, ROWNUM rn FROM (
                SELECT u.* FROM app_users u
                JOIN roles r ON u.role_id = r.role_id
                WHERE r.role_name = :roleName
                ORDER BY u.user_id
            ) u WHERE ROWNUM <= :endRow
        ) WHERE rn > :startRow
        """, nativeQuery = true)
    List<User> findUsersByRoleName(
            @Param("roleName") String roleName,
            @Param("startRow") int startRow,
            @Param("endRow") int endRow
    );

    @Query(value = """
        SELECT * FROM (
            SELECT u.*, ROWNUM rn FROM (
                SELECT u.* FROM app_users u
                JOIN roles r ON u.role_id = r.role_id
                WHERE r.role_name = :roleName AND u.is_active = :active
                ORDER BY u.user_id
            ) u WHERE ROWNUM <= :endRow
        ) WHERE rn > :startRow
        """, nativeQuery = true)
    List<User> findUsersByRoleNameAndActive(
            @Param("roleName") String roleName,
            @Param("active") boolean active,
            @Param("startRow") int startRow,
            @Param("endRow") int endRow
    );

    @Query(value = "SELECT COUNT(*) FROM app_users", nativeQuery = true)
    long count();

    @Query(value = """
        SELECT COUNT(*) FROM app_users u 
        JOIN roles r ON u.role_id = r.role_id 
        WHERE r.role_name = :roleName
    """, nativeQuery = true)
    long countUsersByRoleName(@Param("roleName") String roleName);

    @Query(value = """
        SELECT COUNT(*) FROM app_users u WHERE u.is_active = :active
    """, nativeQuery = true)
    long countUsersByActiveStatus(@Param("active") boolean active);

    @Query(value = """
        SELECT COUNT(*) FROM app_users u 
        JOIN roles r ON u.role_id = r.role_id 
        WHERE r.role_name = :roleName AND u.is_active = :active
    """, nativeQuery = true)
    long countUsersByRoleNameAndActive(@Param("roleName") String roleName, @Param("active") boolean active);
}
