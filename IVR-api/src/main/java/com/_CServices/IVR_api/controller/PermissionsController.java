package com._CServices.IVR_api.controller;

import com._CServices.IVR_api.dto.request.PermissionsRequest;
import com._CServices.IVR_api.dto.response.PermissionsResponse;
import com._CServices.IVR_api.service.PermissionsService;
import com._CServices.IVR_api.utils.SortUtils;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;



@RestController
@RequestMapping("/api/v1/permissions")
@RequiredArgsConstructor
public class PermissionsController {
    private final PermissionsService permissionsService;


    @GetMapping
    public ResponseEntity<Page<PermissionsResponse>> getPermissions(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String createdBy,
            @RequestParam(required = false) String updatedBy,
            @RequestParam(required = false) LocalDate createdAt,
            @RequestParam(required = false) LocalDate updatedAt,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "permission_id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        String sanitizedSortBy = SortUtils.sanitizeSortField(sortBy, SortUtils.getAllowedPermissionFields(), "permission_id");
        String sanitizedSortDir = SortUtils.sanitizeSortDirection(sortDir);

        Pageable pageable = org.springframework.data.domain.PageRequest.of(
                page,
                size,
                sanitizedSortDir.equalsIgnoreCase("desc")
                        ? org.springframework.data.domain.Sort.by(sanitizedSortBy).descending()
                        : org.springframework.data.domain.Sort.by(sanitizedSortBy).ascending()
        );

        return ResponseEntity.ok(
                permissionsService.getPermissionsWithFilters(
                id, name, createdBy, updatedBy, createdAt, updatedAt, sanitizedSortBy, sanitizedSortDir,pageable
                )
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<PermissionsResponse> getPermissionById(@PathVariable Long id) {
        return ResponseEntity.ok(permissionsService.getPermissionById(id));

    }

    @GetMapping("/name")
    public ResponseEntity<PermissionsResponse> getPermissionByName(@RequestParam @NotBlank String name) {
        return ResponseEntity.ok(permissionsService.getPermissionByName(name));

    }
    @GetMapping("/description")
    public ResponseEntity<PermissionsResponse> getPermissionByDescription(@RequestParam @NotBlank String description) {
        return ResponseEntity.ok(permissionsService.getPermissionByDescription(description));
    }

    @PostMapping
    public ResponseEntity<PermissionsResponse> createPermission(@RequestBody @Valid PermissionsRequest permissionsRequest) {
        return ResponseEntity.ok(permissionsService.createPermission(permissionsRequest));
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
