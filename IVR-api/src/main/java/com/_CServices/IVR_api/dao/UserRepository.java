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


    @Query(value = """
        SELECT * FROM (
            SELECT u.*, ROWNUM rn FROM (
                SELECT * FROM app_users
                WHERE LOWER(first_name) LIKE LOWER('%' || :firstName || '%')
                ORDER BY user_id
            ) u WHERE ROWNUM <= :endRow
        ) WHERE rn > :startRow
        """, nativeQuery = true)
    List<User> findUsersByFirstName(
            @Param("firstName") String firstName,
            @Param("startRow") int startRow,
            @Param("endRow") int endRow
    );

    @Query(value = """
        SELECT COUNT(*) FROM app_users 
        WHERE LOWER(first_name) LIKE LOWER('%' || :firstName || '%')
        """, nativeQuery = true)
    long countUsersByFirstName(@Param("firstName") String firstName);

    @Query(value = """
        SELECT * FROM (
            SELECT u.*, ROWNUM rn FROM (
                SELECT * FROM app_users
                WHERE LOWER(last_name) LIKE LOWER('%' || :lastName || '%')
                ORDER BY user_id
            ) u WHERE ROWNUM <= :endRow
        ) WHERE rn > :startRow
        """, nativeQuery = true)
    List<User> findUsersByLastName(
            @Param("lastName") String lastName,
            @Param("startRow") int startRow,
            @Param("endRow") int endRow
    );

    @Query(value = """
        SELECT COUNT(*) FROM app_users 
        WHERE LOWER(last_name) LIKE LOWER('%' || :lastName || '%')
        """, nativeQuery = true)
    long countUsersByLastName(@Param("lastName") String lastName);

    @Query(value = """
        SELECT * FROM (
            SELECT u.*, ROWNUM rn FROM (
                SELECT * FROM app_users
                WHERE LOWER(first_name) LIKE LOWER('%' || :firstName || '%')
                AND LOWER(last_name) LIKE LOWER('%' || :lastName || '%')
                ORDER BY user_id
            ) u WHERE ROWNUM <= :endRow
        ) WHERE rn > :startRow
        """, nativeQuery = true)
    List<User> findUsersByFirstNameAndLastName(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("startRow") int startRow,
            @Param("endRow") int endRow
    );

    @Query(value = """
        SELECT COUNT(*) FROM app_users 
        WHERE LOWER(first_name) LIKE LOWER('%' || :firstName || '%')
        AND LOWER(last_name) LIKE LOWER('%' || :lastName || '%')
        """, nativeQuery = true)
    long countUsersByFirstNameAndLastName(
            @Param("firstName") String firstName,
            @Param("lastName") String lastName
    );
}

