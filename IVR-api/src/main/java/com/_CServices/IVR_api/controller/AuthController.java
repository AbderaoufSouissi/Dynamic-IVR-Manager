package com._CServices.IVR_api.controller;



import com._CServices.IVR_api.dto.request.ForgetPasswordRequest;
import com._CServices.IVR_api.dto.request.ResetPasswordRequest;
import com._CServices.IVR_api.dto.response.MessageResponse;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.mapper.UserMapper;
import com._CServices.IVR_api.security.AuthService;
import com._CServices.IVR_api.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Validated
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/forget-password")
    public ResponseEntity<MessageResponse> forgotPassword(@Valid @RequestBody ForgetPasswordRequest request) {
        log.info("Password reset requested for email: {}", request.getEmail());

        authService.sendPasswordResetEmail(request.getEmail());

        // Always return success message to prevent email enumeration
        return ResponseEntity.ok(new MessageResponse("If the email exists, reset instructions have been sent"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<MessageResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest request, @RequestParam String token) {
        log.info("Password reset attempt with token");

        authService.resetPassword(token, request.getNewPassword());

        return ResponseEntity.ok(new MessageResponse("Password reset successful"));
    }



    @GetMapping("/user")
    @Transactional
    public ResponseEntity<?> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        Object principal = authentication.getPrincipal();

        if (!(principal instanceof User)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user principal");
        }

        User user = (User) principal;

        return ResponseEntity.ok(userService.getUserById(user.getId()));
    }

}

