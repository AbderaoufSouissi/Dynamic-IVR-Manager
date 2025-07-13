package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.PermissionsDto;
import com._CServices.IVR_api.service.PermissionsService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/permissions")
@RequiredArgsConstructor
public class PermissionsController {
    private final PermissionsService permissionsService;


    @GetMapping
    public ResponseEntity<List<PermissionsDto>> getAllPermissions() {
        return ResponseEntity.ok(permissionsService.getAllPermissions());

    }

    @GetMapping("/{id}")
    public ResponseEntity<PermissionsDto> getPermissionById(@PathVariable Long id) {
        return ResponseEntity.ok(permissionsService.getPermissionById(id));

    }

    @GetMapping("/name")
    public ResponseEntity<PermissionsDto> getPermissionByName(@RequestParam @NotBlank String name) {
        return ResponseEntity.ok(permissionsService.getPermissionByName(name));

    }
    @GetMapping("/description")
    public ResponseEntity<PermissionsDto> getPermissionByDescription(@RequestParam @NotBlank String description) {
        return ResponseEntity.ok(permissionsService.getPermissionByDescription(description));
    }

    @PostMapping
    public ResponseEntity<PermissionsDto> createPermission(@RequestBody @Valid PermissionsDto permissionsDto) {
        return ResponseEntity.ok(permissionsService.createPermission(permissionsDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePermissionById(@PathVariable @NotNull Long id) {
        permissionsService.deletePermissionById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/name")
    public ResponseEntity<Void> deletePermissionByName(@RequestParam @NotBlank String name) {
        permissionsService.deletePermissionByName(name);
        return ResponseEntity.noContent().build();

    }




}
