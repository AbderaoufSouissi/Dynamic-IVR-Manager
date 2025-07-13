package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.RoleRepository;
import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.dto.UserDto;
import com._CServices.IVR_api.entity.Role;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ResourceAlreadyExistsException;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.mapper.UserMapper;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.service.AuditService;
import com._CServices.IVR_api.service.AuthService;
import com._CServices.IVR_api.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuditService auditService;
    private final AuthService authService;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;




    @Override
    public List<UserDto> getAllUsers() {
        log.info("inside getAllUsers()");
        List<User> userList = userRepository.findAll();
        List<UserDto> users = userList.stream()
                .map(user -> userMapper.toDto(user))
                .toList();
        return users;

    }

    @Override
    public List<UserDto> getUsersByActiveStatus(Boolean active) {
        log.info("inside getUsersByActiveStatus()");

        List<User> userList = userRepository.findAllByActive(active);
        List<UserDto> users = userList.stream()
                .map(user -> userMapper.toDto(user))
                .toList();
        return users;
    }

    @Override
    public List<UserDto> getUsersByRoleName(String roleName) {
        log.info("inside getUsersByRoleName()");

        Role role = Optional.ofNullable(roleRepository.findByName(roleName)).orElseThrow(()-> new ResourceNotFoundException("Role "+roleName+" not found"));
        List<User> userList = userRepository.findAllByRole(role);
        List<UserDto> users = userList.stream()
                .map(user -> userMapper.toDto(user))
                .toList();
        return users;
    }

    @Override
    public UserDto getUserById(Long id) {
        log.info("inside getUserById()");
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with ID : "+id+" Not Found"));
        return userMapper.toDto(user);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        log.info("inside getUserByEmail()");
        User user = Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(() -> new ResourceNotFoundException("User with Email : "+email+" Found"));
        return userMapper.toDto(user);
    }

    @Override
    public UserDto getUserByUsername(String username) {
        log.info("inside getUserByUsername()");
        User user = Optional.ofNullable(userRepository.findByUsername(username))
                .orElseThrow(() -> new ResourceNotFoundException("User with Username : "+username+" Not Found"));
        return userMapper.toDto(user);
    }

    @Override
    @Transactional
    public UserDto createUser(UserDto userDto) {
        User currentUser = authService.getCurrentLoggedInUser();
        if(null == userDto.getRoleName()){
            userDto.setRoleName("DEFAULT_ROLE");
        }
        if(Objects.equals(userDto.getRoleName(), "DEFAULT_ROLE") &&
                null == roleRepository.findByName(userDto.getRoleName())){
            Role role = Role.builder()
                    .name(userDto.getRoleName())
                    .permissions(new HashSet<>())
                    .build();
            Role newRole = roleRepository.save(role);

            auditService.logAction(
                    ActionType.CREATE_ROLE.toString(),
                    EntityType.ROLE.toString(),
                    newRole.getId()
            );


        }

        if(null == roleRepository.findByName(userDto.getRoleName())){
            throw new ResourceNotFoundException("Cannot assign non existing Role : "+userDto.getRoleName()+" to user");
        }

        if(userRepository.existsByUsername(userDto.getUsername())) {
            throw new ResourceAlreadyExistsException("User with Username : "+userDto.getUsername()+" Already Exists");

        } else if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new ResourceAlreadyExistsException("User with Email : "+userDto.getEmail()+" Already Exists");
        }
        else {
            User user = User.builder()
                    .firstName(userDto.getFirstName())
                    .lastName(userDto.getLastName())
                    .username(userDto.getUsername())
                    .email(userDto.getEmail())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .active(userDto.getActive())
                    .role(roleRepository.findByName(userDto.getRoleName()))
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
        // 1. Get the user to be deleted (throws exception if not found)
        User userToDelete = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + id + " not found"));

        // 2. Get the currently authenticated user (deleter)
        User currentUser = authService.getCurrentLoggedInUser();


        // 3. Perform deletion first
        userRepository.delete(userToDelete);


        auditService.logAction(

                ActionType.DELETE_USER.toString(),
                EntityType.USER.toString(),
                userToDelete.getId()
        );
    }

    @Override
    public void deleteUserByEmail(String email) {
        log.info("inside deleteUserByEmail()");

        User userToDelete = Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(() -> new ResourceNotFoundException("User with Email : "+email+" Not Found"));
        userRepository.delete(userToDelete);
        User currentUser = authService.getCurrentLoggedInUser();

        auditService.logAction(
                ActionType.DELETE_USER.toString(),
                EntityType.USER.toString(),
                userToDelete.getId()
        );
    }

    @Override
    public void deleteUserByUsername(String username) {
        log.info("inside deleteUserByUsername()");
        User userToDelete = Optional.ofNullable(userRepository.findByUsername(username))
                .orElseThrow(() -> new ResourceNotFoundException("User with Username : "+username+" Not Found"));
        userRepository.delete(userToDelete);
        User currentUser = authService.getCurrentLoggedInUser();

        auditService.logAction(
                ActionType.DELETE_USER.toString(),
                EntityType.USER.toString(),
                userToDelete.getId()
        );

    }

    @Override
    public UserDto updateUser(UserDto userDto, Long id) {
        User userToUpdate = userRepository.findById(id).map(user->{
            if(null != userDto.getFirstName()) {
                user.setFirstName(userDto.getFirstName());
            }
            if(null != userDto.getLastName()) {
                user.setLastName(userDto.getLastName());
            }
            if(null != userDto.getEmail()){
                user.setEmail(userDto.getEmail());
            }
            if(null != userDto.getUsername()){
                user.setUsername(userDto.getUsername());
            }
            if(null != userDto.getPassword()){
                user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            }
            if(null != userDto.getActive()){
                user.setActive(userDto.getActive());
            }
            return userRepository.save(user);
        }).orElseThrow(()-> new ResourceNotFoundException(""));

        User currentUser = authService.getCurrentLoggedInUser();

        auditService.logAction(
                ActionType.UPDATE_USER.toString(),
                EntityType.USER.toString(),
                userToUpdate.getId()
        );

        return userMapper.toDto(userToUpdate);

    }


}
