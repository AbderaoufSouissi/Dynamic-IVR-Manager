package com._CServices.IVR_api.enumeration;

import static com._CServices.IVR_api.constant.Constants.*;

public enum ActionType {

    CREATE_USER(CREATE_USER_PERMISSION),
    UPDATE_USER(UPDATE_USER_PERMISSION),
    DELETE_USER(DELETE_USER_PERMISSION),
    CREATE_ROLE(CREATE_ROLE_PERMISSION),
    UPDATE_ROLE(UPDATE_ROLE_PERMISSION),
    DELETE_ROLE(DELETE_ROLE_PERMISSION),
    BLACKLIST_CUSTOMER(BLACKLIST_CUSTOMER_PERMISSION),
    WHITELIST_CUSTOMER(WHITELIST_CUSTOMER_PERMISSION),
    RESET_NB_CALLS(RESET_NB_CALLS_PERMISSION);

    private final String value;


    ActionType(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
