package com._CServices.IVR_api.dto.response;

import com._CServices.IVR_api.dto.BaseDto;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@JsonPropertyOrder({"permissionId", "name", "description", "createdAt","createdBy", "updatedAt", "updatedBy"})
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PermissionsResponse extends BaseDto {
    private Long permissionId;

    @NotBlank(message = "Permission name cannot be empty")
    private String name;

    @NotBlank(message = "Permission description cannot be empty")
    private String description;
}
