package com._CServices.IVR_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MsisdnRequest {
    @NotBlank(message = "MSISDN must not be blank")
    @Size(min = 8, max = 8, message = "MSISDN must be exactly 8 digits")
    @Pattern(regexp = "\\d{8}", message = "MSISDN must be numeric")
    private String msisdn;
}
