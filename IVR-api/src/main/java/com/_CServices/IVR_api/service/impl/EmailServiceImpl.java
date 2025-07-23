package com._CServices.IVR_api.service.impl;

import com._CServices.IVR_api.exception.ApiException;
import com._CServices.IVR_api.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private static final String PASSWORD_RESET_REQUEST = "Reset Password Request";

    private final JavaMailSender sender;

    @Value("${spring.mail.verify.host}")
    private String host;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    @Async
    public void sendResetPasswordEmail(String username, String to, String token) {
        log.info("Sending password reset email to: {}", to);
        try {
            var message = new SimpleMailMessage();
            message.setSubject(PASSWORD_RESET_REQUEST);
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setText(getResetPasswordMessage(username, host, token));

            sender.send(message);
            log.info("Password reset email sent successfully to: {}", to);

        } catch (Exception exception) {
            log.error("Failed to send password reset email to: {}", to, exception);
            throw new ApiException("Unable to send password reset email");
        }
    }

    private String getResetPasswordMessage(String username, String host, String token) {
        return String.format(
                "Hello %s,\n\n" +
                        "You requested a password reset for your account.\n\n" +
                        "Please click the link below to open the reset form:\n" +
                        "%s?token=%s\n\n" +
                        "This link will expire in 15 minutes.\n\n" +
                        "If you didn't request this password reset, please ignore this email.\n\n" +
                        "Best regards,\n" +
                        "Your Application Team",
                username, host, token
        );
    }

}