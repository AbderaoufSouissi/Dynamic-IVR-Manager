package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.AuditRepository;
import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.dto.UserDto;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
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
                    .build();
            user = userRepository.save(user);
            User loggedInUser = authService.getCurrentLoggedInUser();
            if (loggedInUser == null) {
                loggedInUser = user;
            }
            auditService.logAction(
                    loggedInUser,
                    ActionType.CREATE_USER,
                    EntityType.USER,user.getId()
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
        User deletingUser = authService.getCurrentLoggedInUser();
        if (deletingUser == null) {
            deletingUser = userToDelete;
        }

        // 3. Perform deletion first
        userRepository.delete(userToDelete);
        userRepository.flush();


        // 4. Log the action AFTER successful deletion
        auditService.logAction(
                deletingUser,                    // Who performed the action
                ActionType.DELETE_USER,          // Action type
                EntityType.USER,                 // Entity type being acted upon
                userToDelete.getId()             // ID of the deleted user
        );
    }

    @Override
    public void deleteUserByEmail(String email) {
        log.info("inside deleteUserByEmail()");
        if (!userRepository.existsByEmail(email)){
            throw new ResourceNotFoundException("User with Email : "+email+" Not Found");
        }
        User user = userRepository.findByEmail(email);
        userRepository.delete(user);

    }

    @Override
    public void deleteUserByUsername(String username) {
        log.info("inside deleteUserByUsername()");
        if(!userRepository.existsByUsername(username)){
            throw new ResourceNotFoundException("User with Username : "+username+" Not Found");
        }
        User user = userRepository.findByUsername(username);
        userRepository.delete(user);

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

        return userMapper.toDto(userToUpdate);

    }


}
