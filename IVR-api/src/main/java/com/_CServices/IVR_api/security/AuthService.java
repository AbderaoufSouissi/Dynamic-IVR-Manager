package com._CServices.IVR_api.security;

import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public User getCurrentLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("No authenticated user found");
        }

        Object principal = authentication.getPrincipal();

        if (!(principal instanceof User)) {
            throw new IllegalStateException("Principal is not an instance of User");
        }

        User user = (User) principal;

        return userRepository.findById(user.getId())
                .orElseThrow(() -> new IllegalStateException("User not found in DB"));
    }

    public Long getCurrentUserId() {
        return getCurrentLoggedInUser().getId();
    }
}






