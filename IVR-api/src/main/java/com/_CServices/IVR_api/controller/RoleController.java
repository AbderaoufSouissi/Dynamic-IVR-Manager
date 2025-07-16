package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.RoleDto;
import com._CServices.IVR_api.service.RoleService;
import com._CServices.IVR_api.utils.SortUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;


    @GetMapping
    public ResponseEntity<Page<RoleDto>> getRoles(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "role_id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        String sanitizedSortBy = SortUtils.sanitizeSortField(sortBy, SortUtils.getAllowedRoleFields(), "role_id");
        String sanitizedSortDir = SortUtils.sanitizeSortDirection(sortDir);

        Pageable pageable = org.springframework.data.domain.PageRequest.of(
                page,
                size,
                sanitizedSortDir.equalsIgnoreCase("desc")
                        ? org.springframework.data.domain.Sort.by(sanitizedSortBy).descending()
                        : org.springframework.data.domain.Sort.by(sanitizedSortBy).ascending()
        );

        if(name != null && !name.isBlank()) {
            return ResponseEntity.ok(new PageImpl<>(List.of(roleService.getRoleByName(name)), pageable, 1));

        }


        return ResponseEntity.ok(roleService.getAllRoles(pageable));
    }

    @GetMapping("/name")
    public ResponseEntity<RoleDto> getRoleByName(@RequestParam String roleName) {
        return ResponseEntity.ok(roleService.getRoleByName(roleName));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDto> getRoleById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));

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
