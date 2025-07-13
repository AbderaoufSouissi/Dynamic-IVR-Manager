package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private SecurityContextRepository securityContextRepository =
            new HttpSessionSecurityContextRepository();



    @GetMapping("/current")
    public ResponseEntity<?> getCurrentUser() {
        User currentUser = authService.getCurrentLoggedInUser();

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("message", "No authenticated user found")
            );
        }

        return ResponseEntity.ok(currentUser);
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest request) {
//        return new ResponseEntity<>(authService.login(request), HttpStatus.OK);
//    }



}
