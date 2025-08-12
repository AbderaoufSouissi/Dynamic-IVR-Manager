package com._CServices.IVR_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN) // 403
public class ActionNotAllowedException extends RuntimeException {
    public ActionNotAllowedException(String message) {
        super(message);
    }
}
