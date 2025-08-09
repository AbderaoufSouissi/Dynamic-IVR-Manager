package com._CServices.IVR_api.dto.response;

import com._CServices.IVR_api.dto.BaseDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonPropertyOrder({"userId", "firstName", "lastName", "username", "email", "password", "active", "roleName",  "createdAt", "createdBy", "updatedAt",  "updatedBy"})
public class UserResponse extends BaseDto {
    private Long userId;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Username is required")
    private String username;

    @Email(message = "Email should be valid")
    private String email;

    @JsonIgnore
    @NotBlank(message = "Password is required")
    private String password;

    @NotNull(message = "Active status is required")
    private Boolean active;

    private String roleName;
    @Builder.Default
    private Set<String> permissions = new HashSet<>();
}
