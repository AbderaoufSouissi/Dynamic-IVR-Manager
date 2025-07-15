package com._CServices.IVR_api.dto.request;

import jakarta.validation.constraints.Email;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ForgetPasswordRequest {
    @Email(message = "Invalid email")
    private String email;


}
