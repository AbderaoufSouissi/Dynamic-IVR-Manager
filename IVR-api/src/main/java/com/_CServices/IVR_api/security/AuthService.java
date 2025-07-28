package com._CServices.IVR_api.security;

import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.enumeration.EntityType;
import com._CServices.IVR_api.exception.ApiException;
import com._CServices.IVR_api.audit.AuditLoggingService;
import com._CServices.IVR_api.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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
    private final AuditLoggingService auditLoggingService;

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
        auditLoggingService.logAction(ActionType.FORGET_PASSWORD.toString(),EntityType.USER.toString(),user.getId(),null);


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


        auditLoggingService.logAction(ActionType.RESET_PASSWORD.toString(), String.valueOf(EntityType.USER),user.getId(),null);

        log.info("Password reset successful for user: {}", email);
    }





}






