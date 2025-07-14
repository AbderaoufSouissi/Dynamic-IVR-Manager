package com._CServices.IVR_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PermissionsDto {
    private Long id;
    @NotBlank(message = "Permission name cannot be empty")
    private String name;
    @NotBlank(message = "Permission description cannot be empty")
    private String description;

    private Long createdBy;


    private LocalDateTime createdAt;


    private LocalDateTime updatedAt;


    private Long updatedBy;

}
