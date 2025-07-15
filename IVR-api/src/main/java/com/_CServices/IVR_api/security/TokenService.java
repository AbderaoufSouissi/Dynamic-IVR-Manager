package com._CServices.IVR_api.security;

import com._CServices.IVR_api.exception.ApiException;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class TokenService {

    private final Map<String, TokenData> tokenStore = new ConcurrentHashMap<>();

    /**
     * Generate a new reset token for the given email
     * Token expires in 15 minutes
     */
    public String generateResetToken(String email) {
        String token = UUID.randomUUID().toString();
        long expiresAt = System.currentTimeMillis() + 15 * 60 * 1000; // 15 minutes

        tokenStore.put(token, new TokenData(email, expiresAt));
        log.info("Generated reset token for email: {}", email);

        return token;
    }

    /**
     * Validate token and return associated email
     * Token is consumed (removed) after validation for one-time use
     */
    public String validateAndConsumeToken(String token) {
        TokenData data = tokenStore.remove(token); // Remove immediately for one-time use

        if (data == null) {
            log.warn("Invalid token attempted: {}", token);
            throw new ApiException("Invalid or already used token");
        }

        if (System.currentTimeMillis() > data.getExpiresAt()) {
            log.warn("Expired token attempted for email: {}", data.getEmail());
            throw new ApiException("Token has expired");
        }

        log.info("Valid token consumed for email: {}", data.getEmail());
        return data.getEmail();
    }

    /**
     * Get current number of active tokens (for monitoring)
     */
    public int getActiveTokenCount() {
        return tokenStore.size();
    }

    /**
     * Clean up expired tokens every 5 minutes
     * This prevents memory leaks from tokens that expire but are never used
     */
    @Scheduled(fixedRate = 300000) // Every 5 minutes
    public void cleanupExpiredTokens() {
        long now = System.currentTimeMillis();
        int removedCount = 0;

        var iterator = tokenStore.entrySet().iterator();
        while (iterator.hasNext()) {
            var entry = iterator.next();
            if (now > entry.getValue().getExpiresAt()) {
                iterator.remove();
                removedCount++;
            }
        }

        if (removedCount > 0) {
            log.info("Cleaned up {} expired tokens", removedCount);
        }
    }

    /**
     * Clear all tokens (useful for testing or emergency cleanup)
     */
    public void clearAllTokens() {
        int count = tokenStore.size();
        tokenStore.clear();
        log.info("Cleared {} tokens", count);
    }
}