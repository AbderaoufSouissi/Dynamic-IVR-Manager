package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.PermissionsDto;
import com._CServices.IVR_api.service.PermissionsService;
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

    @PostMapping
    public ResponseEntity<PermissionsDto> createPermission(@RequestBody PermissionsDto permissionsDto) {
        return ResponseEntity.ok(permissionsService.createPermission(permissionsDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePermissionById(@PathVariable Long id) {
        permissionsService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/name")
    public ResponseEntity<Void> deletePermissionByName(@RequestParam String name) {
        permissionsService.deleteByName(name);
        return ResponseEntity.noContent().build();

    }




}
