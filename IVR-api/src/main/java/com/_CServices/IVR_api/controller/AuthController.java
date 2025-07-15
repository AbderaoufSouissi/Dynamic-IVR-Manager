package com._CServices.IVR_api.controller;



import com._CServices.IVR_api.dto.request.ForgetPasswordRequest;
import com._CServices.IVR_api.dto.request.ResetPasswordRequest;
import com._CServices.IVR_api.dto.response.MessageResponse;
import com._CServices.IVR_api.security.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Validated
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/forget-password")
    public ResponseEntity<MessageResponse> forgotPassword(@Valid @RequestBody ForgetPasswordRequest request) {
        log.info("Password reset requested for email: {}", request.getEmail());

        authService.sendPasswordResetEmail(request.getEmail());

        // Always return success message to prevent email enumeration
        return ResponseEntity.ok(new MessageResponse("If the email exists, reset instructions have been sent"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<MessageResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        log.info("Password reset attempt with token");

        authService.resetPassword(request.getToken(), request.getNewPassword());

        return ResponseEntity.ok(new MessageResponse("Password reset successful"));
    }
}

