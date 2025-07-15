package com._CServices.IVR_api.security;

import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.exception.ApiException;
import com._CServices.IVR_api.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    /**
     * Send password reset email with token
     */
    public void sendPasswordResetEmail(String email) {
        // Check if user exists
        User user = Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(() -> new ApiException("User with this email does not exist"));

        // Generate token
        String token = tokenService.generateResetToken(email);

        // Send email
        emailService.sendResetPasswordEmail(user.getUsername(), email, token);

        log.info("Password reset email sent to: {}", email);
    }

    public void resetPassword(String token, String newPassword) {
        // Validate token and get email
        String email = tokenService.validateAndConsumeToken(token);

        // Find user
        User user = Optional.ofNullable(userRepository.findByEmail(email))
                .orElseThrow(() -> new ApiException("User not found"));

        // Update password
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        log.info("Password reset successful for user: {}", email);
    }


    public boolean isTokenValid(String token) {
        try {
            // This would need a separate method in TokenService if you want to check without consuming
            // For now, we'll just validate and consume
            tokenService.validateAndConsumeToken(token);
            return true;
        } catch (ApiException e) {
            return false;
        }
    }




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


}






