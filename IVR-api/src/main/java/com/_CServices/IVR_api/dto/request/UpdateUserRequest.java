package com._CServices.IVR_api.dto.request;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateUserRequest {
    private String firstName;
    private String lastName;
    private String username;

    @Email
    private String email;

    // Nullable → if null, don't update password
    private String password;

    private Boolean active;
    private String roleName;
}
