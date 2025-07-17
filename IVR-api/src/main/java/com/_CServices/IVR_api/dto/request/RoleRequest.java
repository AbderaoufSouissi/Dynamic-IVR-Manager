package com._CServices.IVR_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoleRequest {
    @NotBlank(message = "Role name is required")
    private String name;

    @Builder.Default
    private Set<String> permissions = new HashSet<>();

}
