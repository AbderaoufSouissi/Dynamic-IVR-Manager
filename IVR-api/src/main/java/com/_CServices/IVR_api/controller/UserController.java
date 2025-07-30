package com._CServices.IVR_api.controller;


import com._CServices.IVR_api.dto.request.CreateUserRequest;
import com._CServices.IVR_api.dto.request.UpdateUserRequest;
import com._CServices.IVR_api.dto.response.UserResponse;
import com._CServices.IVR_api.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;


@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping
    public ResponseEntity<Page<UserResponse>> getUsers(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) Boolean active,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String createdBy,
            @RequestParam(required = false) String updatedBy,
            @RequestParam(required = false) LocalDate createdAt,
            @RequestParam(required = false) LocalDate updatedAt,
            @RequestParam(defaultValue = "user_id") String sortBy,
            @RequestParam(defaultValue = "desc          ") String sortDir,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ?
                Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<UserResponse> users = userService.getUsersWithFilters(
                id,
                firstName,
                lastName,
                username,
                email,
                active,
                role,
                createdBy,
                updatedBy,
                createdAt,
                updatedAt,
                sortBy,
                sortDir,
                pageable
        );

        return ResponseEntity.ok(users);
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }





    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody @Valid CreateUserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/email")
    public ResponseEntity<Void> deleteUserByEmail(@RequestParam @NotBlank String email) {
        userService.deleteUserByEmail(email);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/username")
    public ResponseEntity<Void> deleteUserByUsername(@RequestParam @NotBlank String username) {
        userService.deleteUserByUsername(username);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUserById(@PathVariable Long id, @RequestBody @Valid UpdateUserRequest userRequest) {
        return ResponseEntity.ok(userService.updateUser(userRequest, id));
    }
}