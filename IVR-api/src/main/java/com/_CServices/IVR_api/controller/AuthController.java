package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.request.LoginRequest;
import com._CServices.IVR_api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;



    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest request) {
        return new ResponseEntity<>(authService.login(request), HttpStatus.OK);
    }



}
