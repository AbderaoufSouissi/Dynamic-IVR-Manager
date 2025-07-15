package com._CServices.IVR_api.service;

public interface EmailService {
    void sendResetPasswordEmail(String name, String to,String token);
}
