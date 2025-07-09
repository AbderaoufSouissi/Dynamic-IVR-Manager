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
public class LoginRequest {

    @NotBlank(message = "Username ne peut pas etre vide")
    private String username;

    @NotBlank(message = "Mot de passe ne peut pas etre vide")
    private String password;
}
