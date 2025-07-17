package com._CServices.IVR_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PermissionsRequest {
    @NotBlank(message = "Permission name cannot be empty")
    private String name;

    @NotBlank(message = "Permission description cannot be empty")
    private String description;
}
