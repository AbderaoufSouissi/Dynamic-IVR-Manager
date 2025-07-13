package com._CServices.IVR_api.domain;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RequestContext {
    private static final ThreadLocal<Long> USER_ID = new ThreadLocal<>();

    private RequestContext() {}

    public static void start() {
        USER_ID.remove(); // clears previous thread-local values
    }

    public static void setUserId(Long userId) {
        USER_ID.set(userId); // use passed-in value
    }

    public static Long getUserId() {
        log.info("Getting User ID from context: {}", USER_ID.get());
        return USER_ID.get();
    }
}

