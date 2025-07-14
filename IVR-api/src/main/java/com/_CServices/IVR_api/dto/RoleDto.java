package com._CServices.IVR_api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonPropertyOrder({
        "roleId",
        "name",
        "permissions",
        "createdAt",
        "createdBy",
        "updatedAt",
        "updatedBy"
})
public class RoleDto extends BaseDto {
    private Long roleId;

    @NotBlank(message = "Role name is required")
    private String name;

    @Builder.Default
    private Set<String> permissions = new HashSet<>();


}