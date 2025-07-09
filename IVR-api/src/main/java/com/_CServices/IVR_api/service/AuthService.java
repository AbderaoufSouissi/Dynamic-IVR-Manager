package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.request.LoginRequest;
import jakarta.validation.Valid;

public interface AuthService {
    //AUTHENTIFICATION

    String getCurrentUser();
    String login(@Valid LoginRequest request);
}
