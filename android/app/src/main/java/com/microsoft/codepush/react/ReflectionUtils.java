package com.microsoft.codepush.react;

import java.lang.reflect.Field;

/**
 * Small reflection helpers used to reach private React Native internals whose
 * names change between React Native versions.
 *
 * <p>Each lookup first tries the given field names and, when none exists, falls
 * back to the first declared field compatible with the expected type.
 */
final class ReflectionUtils {

    private ReflectionUtils() {
    }

    /**
     * Reads a field by name, falling back to the first declared field of
     * {@code type}. Returns {@code null} when the field is missing or cannot be
     * accessed.
     */
    static <T> T tryGetFieldValue(Object target, Class<T> type, String... fieldNames) {
        Field field = findByName(target.getClass(), fieldNames);
        if (field == null) {
            field = findByType(target.getClass(), type);
        }
        if (field == null) {
            return null;
        }

        try {
            field.setAccessible(true);
            return type.cast(field.get(target));
        } catch (IllegalAccessException e) {
            return null;
        }
    }

    /**
     * Writes a value to a field by name, falling back to the first declared
     * field that can hold the value. Returns {@code false} when there is no
     * such field or it cannot be written.
     */
    static boolean trySetFieldValue(Object target, Object value, String... fieldNames) {
        Field field = findByName(target.getClass(), fieldNames);
        if (field == null) {
            field = findAssignableFrom(target.getClass(), value.getClass());
        }
        if (field == null) {
            return false;
        }

        try {
            field.setAccessible(true);
            field.set(target, value);
            return true;
        } catch (IllegalAccessException e) {
            return false;
        }
    }

    private static Field findByName(Class<?> clazz, String... fieldNames) {
        for (String fieldName : fieldNames) {
            try {
                return clazz.getDeclaredField(fieldName);
            } catch (NoSuchFieldException ignored) {
                // Try the next candidate name.
            }
        }
        return null;
    }

    private static Field findByType(Class<?> clazz, Class<?> type) {
        for (Field field : clazz.getDeclaredFields()) {
            if (type.isAssignableFrom(field.getType())) {
                return field;
            }
        }
        return null;
    }

    private static Field findAssignableFrom(Class<?> clazz, Class<?> valueType) {
        for (Field field : clazz.getDeclaredFields()) {
            if (field.getType().isAssignableFrom(valueType)) {
                return field;
            }
        }
        return null;
    }
}
