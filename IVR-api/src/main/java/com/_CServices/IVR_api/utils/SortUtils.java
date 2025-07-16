package com._CServices.IVR_api.utils;


import java.util.Set;

public class SortUtils {
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of(
            "user_id", "username", "email", "first_name", "last_name", "is_active","created_at", "updated_at"
    );

    private static final Set<String> ALLOWED_SORT_DIRECTIONS = Set.of("ASC", "DESC");

    public static String sanitizeSortField(String input) {
        return ALLOWED_SORT_FIELDS.contains(input.toLowerCase()) ? input : "user_id";
    }

    public static String sanitizeSortDirection(String input) {
        return ALLOWED_SORT_DIRECTIONS.contains(input.toUpperCase()) ? input.toUpperCase() : "ASC";
    }
}

