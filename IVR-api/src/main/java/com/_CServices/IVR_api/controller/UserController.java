package com._CServices.IVR_api.controller;


import com._CServices.IVR_api.dto.request.CreateUserRequest;
import com._CServices.IVR_api.dto.request.UpdateUserRequest;
import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.dto.response.UserResponse;
import com._CServices.IVR_api.filter.UserFilter;
import com._CServices.IVR_api.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
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
    public ResponseEntity<PagedResponse<UserResponse>> getUsers(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) Boolean active,
            @RequestParam(required = false) String roleName,
            @RequestParam(required = false) String createdBy,
            @RequestParam(required = false) String updatedBy,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate createdAt,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate updatedAt,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "user_id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        UserFilter filter = new UserFilter();
        filter.setId(id);
        filter.setFirstName(firstName);
        filter.setLastName(lastName);
        filter.setEmail(email);
        filter.setUsername(username);
        filter.setActive(active);
        filter.setRoleName(roleName);
        filter.setCreatedBy(createdBy);
        filter.setUpdatedBy(updatedBy);
        filter.setCreatedAt(createdAt);
        filter.setUpdatedAt(updatedAt);

        PagedResponse<UserResponse> result = userService.getUsers(filter, page, size, sortBy, sortDir);
        return ResponseEntity.ok(result);
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