package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.dto.request.LoginRequest;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public String getCurrentUser() {

        return SecurityContextHolder.getContext().getAuthentication().getName();
    }



    @Override
    public String login(LoginRequest request) {
        log.info("inside login()");
        User existingUser = userRepository.findByUsername(request.getUsername());
        if (null != existingUser) {

            Boolean isActive = existingUser.getActive();
            if (!isActive) {
                return "User: "+existingUser.getUsername()+" is not active";
            }
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                )
        );

        String username = authentication.getName();
        return "Bienvenue " + username + " !";
    }
}
