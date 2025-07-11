package com._CServices.IVR_api.enumeration;

import static com._CServices.IVR_api.constant.Constants.*;

public enum ActionType {

    CREATE_USER(CREATE_USER_DESCRIPTION),
    UPDATE_USER(UPDATE_USER_DESCRIPTION),
    DELETE_USER(DELETE_USER_DESCRIPTION),
    CREATE_ROLE(CREATE_ROLE_DESCRIPTION),
    UPDATE_ROLE(UPDATE_ROLE_DESCRIPTION),
    DELETE_ROLE(DELETE_ROLE_DESCRIPTION),
    BLACKLIST_CUSTOMER(BLACKLIST_CUSTOMER_DESCRIPTION),
    WHITELIST_CUSTOMER(WHITELIST_CUSTOMER_DESCRIPTION),
    RESET_NB_CALLS(RESET_NB_CALLS_DESCRIPTION);

    private final String description;


    ActionType(String value) {
        this.description = value;
    }

    public String getValue() {
        return this.description;
    }
}
