package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.RoleRepository;
import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.dto.request.CreateUserRequest;
import com._CServices.IVR_api.dto.request.UpdateUserRequest;
import com._CServices.IVR_api.dto.response.UserResponse;
import com._CServices.IVR_api.entity.Role;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ResourceAlreadyExistsException;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.mapper.UserMapper;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.service.AuditService;
import com._CServices.IVR_api.service.UserService;
import jakarta.persistence.EntityManager;
import com._CServices.IVR_api.utils.SortUtils;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuditService auditService;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final EntityManager entityManager;





    @Override
    public Page<UserResponse> getUsersWithFilters(
            Long id,
            String firstName,
            String lastName,
            String username,
            String email,
            Boolean active,
            String roleName,
            String createdByUsername,
            String updatedByUsername,
            LocalDate createdAt,
            LocalDate updatedAt,
            String sortBy,
            String sortDir,
            Pageable pageable) {

        log.info("Fetching users with filters");

        // Sanitize sorting
        String sanitizedSortField = SortUtils.sanitizeSortField(
                sortBy != null ? sortBy.toLowerCase() : "",
                SortUtils.getAllowedUserFields(),
                "user_id"
        );
        String sanitizedSortDir = SortUtils.sanitizeSortDirection(sortDir);

        // Calculate pagination bounds
        int[] bounds = getRowBounds(pageable);
        int startRow = bounds[0];
        int endRow = bounds[1];

        // Date-time filtering ranges
        LocalDateTime startCreatedAt = null;
        LocalDateTime endCreatedAt = null;
        if (createdAt != null) {
            startCreatedAt = createdAt.atStartOfDay();
            endCreatedAt = createdAt.atTime(LocalTime.MAX);
        }

        LocalDateTime startUpdatedAt = null;
        LocalDateTime endUpdatedAt = null;
        if (updatedAt != null) {
            startUpdatedAt = updatedAt.atStartOfDay();
            endUpdatedAt = updatedAt.atTime(LocalTime.MAX);
        }

        // CORRECTED SQL query with proper createdByUsername and updatedByUsername filtering
        String sql = "SELECT * FROM (" +
                "  SELECT main_query.*, ROWNUM rn FROM (" +
                "    SELECT u.user_id, u.first_name, u.last_name, u.username, u.password, u.email, " +
                "           u.created_at, u.created_by_id, u.updated_at, u.updated_by_id, u.is_active, " +
                "           u.role_id, " +
                "           NVL(r.role_name, '') AS role_name, " +
                "           NVL(creator.username, '') AS created_by_username, " +
                "           NVL(updater.username, '') AS updated_by_username " +
                "    FROM app_users u " +
                "    LEFT JOIN roles r ON u.role_id = r.role_id " +
                "    LEFT JOIN app_users creator ON u.created_by_id = creator.user_id " +
                "    LEFT JOIN app_users updater ON u.updated_by_id = updater.user_id " +
                "    WHERE (? IS NULL OR u.user_id = ?) " +
                "      AND (? IS NULL OR LOWER(u.first_name) LIKE '%' || LOWER(?) || '%') " +
                "      AND (? IS NULL OR LOWER(u.last_name) LIKE '%' || LOWER(?) || '%') " +
                "      AND (? IS NULL OR LOWER(u.username) LIKE '%' || LOWER(?) || '%') " +
                "      AND (? IS NULL OR LOWER(u.email) LIKE '%' || LOWER(?) || '%') " +
                "      AND (? IS NULL OR u.is_active = ?) " +
                "      AND (? IS NULL OR LOWER(NVL(r.role_name, '')) LIKE '%' || LOWER(?) || '%') " +
                // FIXED: Corrected createdByUsername filtering logic
                "      AND (? IS NULL OR LOWER(NVL(creator.username, '')) LIKE '%' || LOWER(?) || '%') " +
                // FIXED: Corrected updatedByUsername filtering logic
                "      AND (? IS NULL OR LOWER(NVL(updater.username, '')) LIKE '%' || LOWER(?) || '%') " +
                "      AND ((? IS NULL AND ? IS NULL) OR (u.created_at BETWEEN ? AND ?)) " +
                "      AND ((? IS NULL AND ? IS NULL) OR (u.updated_at BETWEEN ? AND ?)) " +
                "    ORDER BY u." + sanitizedSortField + " " + sanitizedSortDir +
                "  ) main_query WHERE ROWNUM <= ?" +
                ") WHERE rn > ?";

        try {
            Query query = entityManager.createNativeQuery(sql, User.class)
                    .setParameter(1, id)
                    .setParameter(2, id)
                    .setParameter(3, firstName)
                    .setParameter(4, firstName)
                    .setParameter(5, lastName)
                    .setParameter(6, lastName)
                    .setParameter(7, username)
                    .setParameter(8, username)
                    .setParameter(9, email)
                    .setParameter(10, email)
                    .setParameter(11, active)
                    .setParameter(12, active)
                    .setParameter(13, roleName)
                    .setParameter(14, roleName)
                    .setParameter(15, createdByUsername)
                    .setParameter(16, createdByUsername)
                    .setParameter(17, updatedByUsername)
                    .setParameter(18, updatedByUsername)
                    .setParameter(19, startCreatedAt)
                    .setParameter(20, endCreatedAt)
                    .setParameter(21, startCreatedAt)
                    .setParameter(22, endCreatedAt)
                    .setParameter(23, startUpdatedAt)
                    .setParameter(24, endUpdatedAt)
                    .setParameter(25, startUpdatedAt)
                    .setParameter(26, endUpdatedAt)
                    .setParameter(27, endRow)
                    .setParameter(28, startRow);

            List<User> users = query.getResultList();

            // CORRECTED Count query with same fix
            String countSql = "SELECT COUNT(u.user_id) " +
                    "FROM app_users u " +
                    "LEFT JOIN roles r ON u.role_id = r.role_id " +
                    "LEFT JOIN app_users creator ON u.created_by_id = creator.user_id " +
                    "LEFT JOIN app_users updater ON u.updated_by_id = updater.user_id " +
                    "WHERE (? IS NULL OR u.user_id = ?) " +
                    "  AND (? IS NULL OR LOWER(u.first_name) LIKE '%' || LOWER(?) || '%') " +
                    "  AND (? IS NULL OR LOWER(u.last_name) LIKE '%' || LOWER(?) || '%') " +
                    "  AND (? IS NULL OR LOWER(u.username) LIKE '%' || LOWER(?) || '%') " +
                    "  AND (? IS NULL OR LOWER(u.email) LIKE '%' || LOWER(?) || '%') " +
                    "  AND (? IS NULL OR u.is_active = ?) " +
                    "  AND (? IS NULL OR LOWER(NVL(r.role_name, '')) LIKE '%' || LOWER(?) || '%') " +
                    // FIXED: Corrected createdByUsername filtering logic
                    "  AND (? IS NULL OR LOWER(NVL(creator.username, '')) LIKE '%' || LOWER(?) || '%') " +
                    // FIXED: Corrected updatedByUsername filtering logic
                    "  AND (? IS NULL OR LOWER(NVL(updater.username, '')) LIKE '%' || LOWER(?) || '%') " +
                    "  AND ((? IS NULL AND ? IS NULL) OR (u.created_at BETWEEN ? AND ?)) " +
                    "  AND ((? IS NULL AND ? IS NULL) OR (u.updated_at BETWEEN ? AND ?))";

            Query countQuery = entityManager.createNativeQuery(countSql)
                    .setParameter(1, id)
                    .setParameter(2, id)
                    .setParameter(3, firstName)
                    .setParameter(4, firstName)
                    .setParameter(5, lastName)
                    .setParameter(6, lastName)
                    .setParameter(7, username)
                    .setParameter(8, username)
                    .setParameter(9, email)
                    .setParameter(10, email)
                    .setParameter(11, active)
                    .setParameter(12, active)
                    .setParameter(13, roleName)
                    .setParameter(14, roleName)
                    .setParameter(15, createdByUsername)
                    .setParameter(16, createdByUsername)
                    .setParameter(17, updatedByUsername)
                    .setParameter(18, updatedByUsername)
                    .setParameter(19, startCreatedAt)
                    .setParameter(20, endCreatedAt)
                    .setParameter(21, startCreatedAt)
                    .setParameter(22, endCreatedAt)
                    .setParameter(23, startUpdatedAt)
                    .setParameter(24, endUpdatedAt)
                    .setParameter(25, startUpdatedAt)
                    .setParameter(26, endUpdatedAt);

            long total = ((Number) countQuery.getSingleResult()).longValue();

            return new PageImpl<>(
                    users.stream().map(userMapper::toDto).collect(Collectors.toList()),
                    pageable,
                    total
            );

        } catch (Exception e) {
            log.error("Error fetching filtered users", e);
            throw new RuntimeException("Error fetching users with filters", e);
        }
    }



    @Override
    public UserResponse getUserById(Long id) {
        log.info("inside getUserById()");
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with ID : "+id+" Not Found"));
        return userMapper.toDto(user);
    }

    @Override
    @Transactional
    public UserResponse createUser(CreateUserRequest request) {
        if(null == request.getRoleName()){
            request.setRoleName("DEFAULT_ROLE");
        }
        if(Objects.equals(request.getRoleName(), "DEFAULT_ROLE") &&
                null == roleRepository.findByName(request.getRoleName())){
            Role role = Role.builder()
                    .name(request.getRoleName())
                    .permissions(new HashSet<>())
                    .build();
            Role defaultRole = roleRepository.save(role);

            auditService.logAction(
                    ActionType.CREATE_ROLE.toString(),
                    EntityType.ROLE.toString(),
                    defaultRole.getId()
            );


        }

        if(null == roleRepository.findByName(request.getRoleName())){
            throw new ResourceNotFoundException("Cannot assign non existing Role : "+request.getRoleName()+" to user");
        }

        if(null != userRepository.findByUsername(request.getUsername())) {
            throw new ResourceAlreadyExistsException("User with Username : "+request.getUsername()+" Already Exists");

        } else if (null != userRepository.findByEmail(request.getEmail())) {
            throw new ResourceAlreadyExistsException("User with Email : "+request.getEmail()+" Already Exists");
        }
        else {
            User user = User.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .username(request.getUsername())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .active(request.getActive())
                    .role(roleRepository.findByName(request.getRoleName()))
                    .build();
            User newUser = userRepository.save(user);

            auditService.logAction(
                    ActionType.CREATE_USER.toString(),
                    EntityType.USER.toString(),
                    newUser.getId()
            );

            return userMapper.toDto(user);

        }


    }

    @Override
    @Transactional
    public void deleteUserById(Long id) {
        User userToDelete = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + id + " not found"));

        Long userToDeleteId = userToDelete.getId();
        userRepository.delete(userToDelete);


        auditService.logAction(
                ActionType.DELETE_USER.toString(),
                EntityType.USER.toString(),
                userToDeleteId
        );
    }

    @Override
    @Transactional
    public void deleteUserByEmail(String email) {
        log.info("inside deleteUserByEmail()");

        User userToDelete = Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(() -> new ResourceNotFoundException("User with Email : "+email+" Not Found"));

        Long userToDeleteId = userToDelete.getId();

        userRepository.delete(userToDelete);

        auditService.logAction(
                ActionType.DELETE_USER.toString(),
                EntityType.USER.toString(),
                userToDeleteId
        );
    }

    @Override
    @Transactional
    public void deleteUserByUsername(String username) {
        log.info("inside deleteUserByUsername()");
        User userToDelete = Optional.ofNullable(userRepository.findByUsername(username))
                .orElseThrow(() -> new ResourceNotFoundException("User with Username : "+username+" Not Found"));

        Long userToDeleteId = userToDelete.getId();
        userRepository.delete(userToDelete);

        auditService.logAction(
                ActionType.DELETE_USER.toString(),
                EntityType.USER.toString(),
                userToDeleteId
        );

    }



    @Override
    public UserResponse updateUser(UpdateUserRequest request, Long id) {
        User userToUpdate = userRepository.findById(id).map(user -> {
            if (request.getFirstName() != null) {
                user.setFirstName(request.getFirstName());
            }
            if (request.getLastName() != null) {
                user.setLastName(request.getLastName());
            }
            if (request.getEmail() != null) {
                user.setEmail(request.getEmail());
            }
            if (request.getUsername() != null) {
                user.setUsername(request.getUsername());
            }
            if (request.getPassword() != null && !request.getPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(request.getPassword()));
            }
            if (request.getActive() != null) {
                user.setActive(request.getActive());
            }
            if (request.getRoleName() != null) {
                Role updatedRole = roleRepository.findByName(request.getRoleName());
                if (updatedRole != null) {
                    user.setRole(updatedRole);
                }
            }
            return userRepository.save(user);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        auditService.logAction(
                ActionType.UPDATE_USER.toString(),
                EntityType.USER.toString(),
                userToUpdate.getId()
        );

        return userMapper.toDto(userToUpdate);
    }



    private int[] getRowBounds(Pageable pageable) {
        int startRow = (int) pageable.getOffset(); // page * size
        int endRow = startRow + pageable.getPageSize();
        return new int[]{startRow, endRow};
    }


}
