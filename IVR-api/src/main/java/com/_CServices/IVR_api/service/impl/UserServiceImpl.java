package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.dto.UserDto;
import com._CServices.IVR_api.exception.ResourceAlreadyExistsException;
import com._CServices.IVR_api.exception.ResourceNotFoundException;
import com._CServices.IVR_api.mapper.UserMapper;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
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
    public List<UserDto> getUsersByActiveStatus(boolean active) {
        return userRepository.findAllByActive(active);
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
                    .build();
            userRepository.save(user);
            return userMapper.toDto(user);

        }


    }

    @Override
    public void deleteUserById(Long id) {
        log.info("inside deleteUserById()");
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User with ID : "+id+" Not Found");
        }
        Optional<User> user = userRepository.findById(id);
        userRepository.deleteById(id);

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
            if(null != userDto.getEmail())
                user.setEmail(userDto.getEmail());
            if(null != userDto.getUsername())
                user.setUsername(userDto.getUsername());
            if(null != userDto.getPassword())
                user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            return user;
        }).orElseThrow(()-> new ResourceNotFoundException(""));

        return userMapper.toDto(userToUpdate);

    }


}
