package com._CServices.IVR_api.security;

import com._CServices.IVR_api.repository.UserRepository;
import com._CServices.IVR_api.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class CurrentUserProvider {


    private final UserRepository userRepository;

    public User getCurrentLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken) {
            throw new IllegalStateException("No authenticated user found");
        }

        Object principal = authentication.getPrincipal();

        if (!(principal instanceof User)) {
            throw new IllegalStateException("Principal is not an instance of User");
        }

        return userRepository.findById(((User) principal).getId())
                .orElseThrow(() -> new IllegalStateException("User not found in DB"));
    }
}
