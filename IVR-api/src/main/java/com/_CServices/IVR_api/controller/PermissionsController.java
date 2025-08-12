package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.request.PermissionsRequest;
import com._CServices.IVR_api.dto.response.PagedResponse;
import com._CServices.IVR_api.dto.response.PermissionsResponse;
import com._CServices.IVR_api.filter.PermissionsFilter;
import com._CServices.IVR_api.service.PermissionsService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api/v1/permissions")
@RequiredArgsConstructor
public class PermissionsController {
    private final PermissionsService permissionsService;

    @GetMapping
    @PreAuthorize("hasAuthority('read:permissions')")
    public ResponseEntity<PagedResponse<PermissionsResponse>> getPermissions(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String createdBy,
            @RequestParam(required = false) String updatedBy,
            @RequestParam(required = false) LocalDate createdAt,
            @RequestParam(required = false) LocalDate updatedAt,
            @RequestParam(required = false, defaultValue = "permission_id") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortDir,
            Pageable pageable
    ) {
        PermissionsFilter filter = PermissionsFilter.builder()
                .id(id)
                .name(name)
                .createdBy(createdBy)
                .updatedBy(updatedBy)
                .createdAt(createdAt)
                .updatedAt(updatedAt)
                .build();


        PagedResponse<PermissionsResponse> response = permissionsService
                .getFilteredPermissions(filter, pageable, sortBy, sortDir);

        return ResponseEntity.ok(response);
    }



    @GetMapping("/all")
    public ResponseEntity<List<PermissionsResponse>> getAllPermissions() {
        List<PermissionsResponse> permissions = permissionsService.getAllPermissions();
        return ResponseEntity.ok(permissions);
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('read:permissions')")
    public ResponseEntity<PermissionsResponse> getPermissionById(@PathVariable Long id) {
        return ResponseEntity.ok(permissionsService.getPermissionById(id));

    }



    @PostMapping
    @PreAuthorize("hasAuthority('create:permissions')")
    public ResponseEntity<PermissionsResponse> createPermission(@RequestBody @Valid PermissionsRequest permissionsRequest) {
        return ResponseEntity.ok(permissionsService.createPermission(permissionsRequest));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('delete:permissions')")
    public ResponseEntity<Void> deletePermissionById(@PathVariable @NotNull Long id) {
        permissionsService.deletePermissionById(id);
        return ResponseEntity.noContent().build();
    }






}
