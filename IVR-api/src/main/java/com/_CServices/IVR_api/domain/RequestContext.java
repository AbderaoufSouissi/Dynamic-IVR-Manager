package com._CServices.IVR_api.domain;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RequestContext {
    private static final ThreadLocal<Long> USER_ID = new ThreadLocal<>();


    private RequestContext() {}

    public static void start(){
        USER_ID.remove();
    }

    public static void setUserId(Long userId){
        USER_ID.set(0L);
    }
    public static Long getUserId(){
        log.info("inside getUserId()");
        log.info("UserID: {}", USER_ID.get());
        return USER_ID.get();
    }
}
