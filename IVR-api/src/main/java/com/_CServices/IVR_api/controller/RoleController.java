package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.request.RoleRequest;
import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.dto.response.RoleResponse;
import com._CServices.IVR_api.filter.RoleFilter;
import com._CServices.IVR_api.service.RoleService;
import com._CServices.IVR_api.utils.SortUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;



@RestController
@RequestMapping("/api/v1/roles")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;


    @GetMapping
    public ResponseEntity<PagedResponse<RoleResponse>> getRoles(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String createdBy,
            @RequestParam(required = false) String updatedBy,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate createdAt,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate updatedAt,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "r.role_id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        RoleFilter filter = RoleFilter.builder()
                .id(id)
                .name(name)
                .createdBy(createdBy)
                .updatedBy(updatedBy)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();



        PagedResponse<RoleResponse> response = roleService.getRolesWithFilters(filter, page, size, sortBy, sortDir);
        return ResponseEntity.ok(response);
    }



    @GetMapping("/{id}")
    public ResponseEntity<RoleResponse> getRoleById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));

    }

    @PostMapping
    public ResponseEntity<RoleResponse> createRole(@RequestBody RoleRequest roleRequest) {
        return ResponseEntity.ok(roleService.createRole(roleRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleResponse> updateRoleById(@PathVariable Long id, @RequestBody RoleRequest roleRequest) {
        return ResponseEntity.ok(roleService.updateRoleById(id, roleRequest));
    }

    @PutMapping
    public ResponseEntity<RoleResponse> updateRoleByName(@RequestParam String name, @RequestBody RoleRequest roleRequest) {
        return ResponseEntity.ok(roleService.updateRoleByName(name, roleRequest));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RoleResponse> deleteRoleById(@PathVariable Long id) {
        roleService.deleteRoleById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/name")
    public ResponseEntity<RoleResponse> deleteRoleByName(@RequestParam String name) {
        roleService.deleteRoleByName(name);
        return ResponseEntity.noContent().build();
    }









}
