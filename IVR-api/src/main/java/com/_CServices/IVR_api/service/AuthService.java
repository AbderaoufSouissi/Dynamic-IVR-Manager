package com._CServices.IVR_api.service;

import com._CServices.IVR_api.dto.request.LoginRequest;
import com._CServices.IVR_api.entity.User;
import jakarta.validation.Valid;

public interface AuthService {
    //AUTHENTIFICATION

    User getCurrentLoggedInUser();
    String login(@Valid LoginRequest request);
}
