package com._CServices.IVR_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoleDto {
    private Long id;
    @NotBlank(message = "Role name is required")
    private String name;
    @Builder.Default
    private Set<String> permissions = new HashSet<>();

    private Long createdBy;


    private LocalDateTime createdAt;


    private LocalDateTime updatedAt;


    private Long updatedBy;

}
