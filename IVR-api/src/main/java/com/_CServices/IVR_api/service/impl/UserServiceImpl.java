package com._CServices.IVR_api.service.impl;


import com._CServices.IVR_api.entity.Permissions;
import com._CServices.IVR_api.exception.ActionNotAllowedException;
import com._CServices.IVR_api.repository.roles.RoleRepository;


import com._CServices.IVR_api.dto.request.CreateUserRequest;
import com._CServices.IVR_api.dto.request.UpdateUserRequest;
import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.dto.response.UserResponse;
import com._CServices.IVR_api.entity.Role;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ResourceAlreadyExistsException;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.filter.UserFilter;
import com._CServices.IVR_api.mapper.UserMapper;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.audit.AuditLoggingService;
import com._CServices.IVR_api.repository.users.UserRepository;
import com._CServices.IVR_api.service.UserService;
import com._CServices.IVR_api.utils.SortUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com._CServices.IVR_api.constant.Constants.DEFAULT_ROLE_NAME;
import static com._CServices.IVR_api.constant.Constants.SYSTEM_USERNAME;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuditLoggingService auditLoggingService;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;


    @Override
    public PagedResponse<UserResponse> getUsers(UserFilter filter, int page, int size, String sortBy, String sortDir) {
        int offset = page * size;

        String sanitizedSortBy = SortUtils.sanitizeSortField(
                sortBy,
                SortUtils.getAllowedUserFields(),
                "user_id"
        );
        String sanitizedSortDir = SortUtils.sanitizeSortDirection(sortDir);

        List<UserResponse> users = userRepository.findUsersWithFilters(filter, sanitizedSortBy, sanitizedSortDir, offset, size);
        long totalElements = userRepository.countUsersWithFilters(filter);




        return PagedResponse.<UserResponse>builder()
                .content(users)
                .page(page)
                .size(size)
                .totalElements(totalElements)
                .totalPages((int) Math.ceil((double) totalElements / size))
                .build();
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
                request.setRoleName(DEFAULT_ROLE_NAME);
            }
            if(Objects.equals(request.getRoleName(), DEFAULT_ROLE_NAME) &&
                    null == roleRepository.findByName(request.getRoleName())){
                Role role = Role.builder()
                        .name(request.getRoleName())
                        .permissions(new HashSet<>())
                        .build();
                Role defaultRole = roleRepository.save(role);

                auditLoggingService.logAction(
                        ActionType.CREATE_ROLE.toString(),
                        EntityType.ROLE.toString(),
                        defaultRole.getId(),
                        null
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

                auditLoggingService.logAction(
                        ActionType.CREATE_USER.toString(),
                        EntityType.USER.toString(),
                        newUser.getId(),
                        null
                );

                return userMapper.toDto(user);

            }


    }

    @Override
    @Transactional
    public void deleteUserById(Long id) {
        User userToDelete = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + id + " not found"));

        if(isSystemUser(userToDelete.getUsername())){
            throw new ActionNotAllowedException("Suppression du user: "+userToDelete.getUsername()+" est strictement interdite");
        }

        Long userToDeleteId = userToDelete.getId();
        userRepository.delete(userToDelete);


        auditLoggingService.logAction(
                ActionType.DELETE_USER.toString(),
                EntityType.USER.toString(),
                userToDeleteId,
                null
        );
    }





    @Override
    public List<String> getUserPermissions(String username) {
        if(userRepository.findByUsername(username) == null) {
            throw new ResourceNotFoundException("User with Username : "+username+" Not Found");
        }
        List<Permissions> permissions = userRepository.getUserPermissions(username);
        List<String> userPermissions = permissions.stream().map(perm-> perm.getName()).toList();
        return userPermissions;

    }


    @Override
    public UserResponse updateUser(UpdateUserRequest request, Long id) {
        User userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        if(isSystemUser(userToUpdate.getUsername())){
            boolean roleChanged = !Objects.equals(request.getRoleName(), userToUpdate.getRole().getName());
            boolean firstNameChanged = !Objects.equals(request.getFirstName(), userToUpdate.getFirstName());
            boolean lastNameChanged = !Objects.equals(request.getLastName(), userToUpdate.getLastName());
            boolean activeChanged = !Objects.equals(request.getActive(), userToUpdate.getActive());
            boolean usernameChanged = !Objects.equals(request.getUsername(), userToUpdate.getUsername());
            if(roleChanged || firstNameChanged || lastNameChanged || activeChanged || usernameChanged) {
                throw new ResourceAlreadyExistsException("La modification du user : " + userToUpdate.getUsername() + " est strictement interdit");

            }
        }

        if (request.getEmail() != null && !request.getEmail().equals(userToUpdate.getEmail())) {
            if (null != userRepository.findByEmail(request.getEmail())){
                throw new ResourceAlreadyExistsException("L'email '" + request.getEmail() + "' est déjà utilisé.");
            }
            userToUpdate.setEmail(request.getEmail());
        }

        if (request.getUsername() != null && !request.getUsername().equals(userToUpdate.getUsername())) {
            if (null != userRepository.findByUsername(request.getUsername())){
                throw new ResourceAlreadyExistsException("Le nom d'utilisateur '" + request.getUsername() + "' est déjà utilisé.");
            }
            userToUpdate.setUsername(request.getUsername());
        }

        if (request.getFirstName() != null) {
            userToUpdate.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            userToUpdate.setLastName(request.getLastName());
        }
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            userToUpdate.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getActive() != null) {
            userToUpdate.setActive(request.getActive());
        }
        if (request.getRoleName() != null) {
            Role updatedRole = Optional.ofNullable(
                    roleRepository.findByName(request.getRoleName())
            ).orElseThrow(() ->
                    new ResourceNotFoundException("Le rôle '" + request.getRoleName() + "' n'existe pas.")
            );
            userToUpdate.setRole(updatedRole);
        }

        User savedUser = userRepository.save(userToUpdate);

        auditLoggingService.logAction(
                ActionType.UPDATE_USER.toString(),
                EntityType.USER.toString(),
                savedUser.getId(),
                null
        );

        return userMapper.toDto(savedUser);
    }

    @Override
    public long getUsersByActive(int active) {
        return userRepository.countByActive(active);
    }


    



    private boolean isSystemUser(String username) {
        return username.equals(SYSTEM_USERNAME);
    }






}
