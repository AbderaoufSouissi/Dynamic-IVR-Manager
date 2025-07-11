package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.RoleDto;
import com._CServices.IVR_api.service.RoleService;
import com._CServices.IVR_api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<List<RoleDto>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDto> getRoleById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));

    }

    @GetMapping("/name")
    public ResponseEntity<RoleDto> getRoleByName(@RequestParam String name) {
        return ResponseEntity.ok(roleService.getRoleByName(name));

    }

    @PostMapping
    public ResponseEntity<RoleDto> createRole(@RequestBody RoleDto roleDto) {
        return ResponseEntity.ok(roleService.createRole(roleDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleDto> updateRoleById(@PathVariable Long id, @RequestBody RoleDto roleDto) {
        return ResponseEntity.ok(roleService.updateRoleById(id, roleDto));
    }

    @PutMapping
    public ResponseEntity<RoleDto> updateRoleByName(@RequestParam String name,
                                                  @RequestBody RoleDto roleDto) {
        return ResponseEntity.ok(roleService.updateRoleByName(name, roleDto));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RoleDto> deleteRoleById(@PathVariable Long id) {
        roleService.deleteRoleById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/name")
    public ResponseEntity<RoleDto> deleteRoleByName(@RequestParam String name) {
        roleService.deleteRoleByName(name);
        return ResponseEntity.noContent().build();
    }









}
