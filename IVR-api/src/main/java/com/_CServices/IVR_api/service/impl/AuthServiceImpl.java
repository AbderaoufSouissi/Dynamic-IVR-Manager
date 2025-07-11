package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.dto.request.LoginRequest;
import com._CServices.IVR_api.entity.Role;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public User getCurrentLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return userRepository.findByUsername("SYSTEM");
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof User) {
            return (User) principal;
        } else if (principal instanceof String) {
            String username = (String) principal;
            return userRepository.findByUsername(username);
        }

        return userRepository.findByUsername(authentication.getName());
    }



    @Override
    public String login(LoginRequest request) {
        log.info("inside login()");

        User existingUser = userRepository.findByUsername(request.getUsername());
        if (existingUser == null) {
            return "User does not exist";
        }

        if (!existingUser.getActive()) {
            return "User: " + existingUser.getUsername() + " is not active";
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            return "Bienvenue " + authentication.getName() + " !";

        } catch (Exception e) {
            log.error("Login failed: {}", e.getMessage());
            return "Invalid username or password";
        }
    }

}
