package com._CServices.IVR_api.utils;

import java.util.Set;

public class SortUtils {

    private static final Set<String> ALLOWED_SORT_DIRECTIONS = Set.of("ASC", "DESC");
    private static final Set<String> ALLOWED_USER_SORT_FIELDS = Set.of("user_id", "username", "email", "first_name", "last_name", "is_active", "created_at", "updated_at");
    private static final Set<String> ALLOWED_ROLE_SORT_FIELDS = Set.of("role_id", "role_name", "created_at", "updated_at");
    private static final Set<String> ALLOWED_PERMISSION_SORT_FIELDS = Set.of("permission_id", "permission_name");
    private static final Set<String> ALLOWED_AUDIT_SORT_FIELDS = Set.of("audit_id", "user_id", "created_at", "updated_at");

    public static String sanitizeSortField(String input, Set<String> allowedFields, String defaultField) {
        return allowedFields.contains(input.toLowerCase()) ? input : defaultField;
    }

    public static String sanitizeSortDirection(String input) {
        return ALLOWED_SORT_DIRECTIONS.contains(input.toUpperCase()) ? input.toUpperCase() : "ASC";
    }


    public static Set<String> getAllowedUserFields() {
        return ALLOWED_USER_SORT_FIELDS;
    }

    public static Set<String> getAllowedRoleFields() {
        return ALLOWED_ROLE_SORT_FIELDS;
    }
}
