package com._CServices.IVR_api.filter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserFilter {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String roleName;
    private Boolean active;
    private String createdBy;
    private LocalDate createdAt;
    private String updatedBy;
    private LocalDate updatedAt;
}
