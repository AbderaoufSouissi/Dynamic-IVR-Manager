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
    public Page<UserDto> getAllUsers(Pageable pageable) {
        log.info("inside getAllUsers()");

        String sortBy = SortUtils.sanitizeSortField(
                pageable.getSort().iterator().next().getProperty()
        );
        String sortDir = SortUtils.sanitizeSortDirection(
                pageable.getSort().iterator().next().getDirection().name()
        );

        int[] bounds = getRowBounds(pageable);
        int startRow = bounds[0];
        int endRow = bounds[1];

        String sql = """
        SELECT * FROM (
            SELECT u.*, ROWNUM rn FROM (
                SELECT * FROM app_users ORDER BY %s %s
            ) u WHERE ROWNUM <= :endRow
        ) WHERE rn > :startRow
        """.formatted(sortBy, sortDir);

        Query query = entityManager.createNativeQuery(sql, User.class)
                .setParameter("startRow", startRow)
                .setParameter("endRow", endRow);

        List<User> users = query.getResultList();

        long total = userRepository.count();

        List<UserDto> userDtos = users.stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());

        return new PageImpl<>(userDtos, pageable, total);
    }




    @Override
    public Page<UserDto> getUsersByActiveStatus(Boolean active, Pageable pageable) {
        int[] bounds = getRowBounds(pageable);
        List<User> users = userRepository.findUsersByActiveStatus(active, bounds[0], bounds[1]);
        long total = userRepository.countUsersByActiveStatus(active);

        List<UserDto> userDtos = users.stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());

        return new PageImpl<>(userDtos, pageable, total);
    }


    @Override
    public Page<UserDto> getUsersByRole(String roleName, Pageable pageable) {
        int[] bounds = getRowBounds(pageable);
        List<User> users = userRepository.findUsersByRoleName(roleName, bounds[0], bounds[1]);
        long total = userRepository.countUsersByRoleName(roleName);

        List<UserDto> userDtos = users.stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());

        return new PageImpl<>(userDtos, pageable, total);
    }


    @Override
    public Page<UserDto> getUsersByRoleAndActiveStatus(String role, Boolean active, Pageable pageable) {
        int[] bounds = getRowBounds(pageable);
        List<User> users = userRepository.findUsersByRoleNameAndActive(role, active, bounds[0], bounds[1]);
        long total = userRepository.countUsersByRoleNameAndActive(role, active);

        List<UserDto> userDtos = users.stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());

        return new PageImpl<>(userDtos, pageable, total);
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
        if(null == userDto.getRoleName()){
            userDto.setRoleName("DEFAULT_ROLE");
        }
        if(Objects.equals(userDto.getRoleName(), "DEFAULT_ROLE") &&
                null == roleRepository.findByName(userDto.getRoleName())){
            Role role = Role.builder()
                    .name(userDto.getRoleName())
                    .permissions(new HashSet<>())
                    .build();
            Role defaultRole = roleRepository.save(role);

            auditService.logAction(
                    ActionType.CREATE_ROLE.toString(),
                    EntityType.ROLE.toString(),
                    defaultRole.getId()
            );


        }

        if(null == roleRepository.findByName(userDto.getRoleName())){
            throw new ResourceNotFoundException("Cannot assign non existing Role : "+userDto.getRoleName()+" to user");
        }

        if(null != userRepository.findByUsername(userDto.getUsername())) {
            throw new ResourceAlreadyExistsException("User with Username : "+userDto.getUsername()+" Already Exists");

        } else if (null != userRepository.findByEmail(userDto.getEmail())) {
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
            if(null != userDto.getRoleName() && roleRepository.findByName(userDto.getRoleName()) != null){
                Role updatedRole = roleRepository.findByName(userDto.getRoleName());
                user.setRole(updatedRole);

            }
            return userRepository.save(user);
        }).orElseThrow(()-> new ResourceNotFoundException(""));


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
