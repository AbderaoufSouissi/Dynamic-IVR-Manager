package com._CServices.IVR_api.filter;

import com._CServices.IVR_api.domain.RequestContext;
import com._CServices.IVR_api.entity.User;
import io.micrometer.common.lang.NonNullApi;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class UserContextFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated()) {
                Object principal = auth.getPrincipal();
                if (principal instanceof User) {
                    User user = (User) principal;
                    RequestContext.setUserId(user.getId());
                } else if (principal instanceof String) {
                    // Usually "anonymousUser" or username String
                    RequestContext.setUserId(0L);  // Or any system/default user id
                } else {
                    RequestContext.setUserId(0L);
                }
            } else {
                RequestContext.setUserId(0L);
            }
            filterChain.doFilter(request, response);
        } catch (ServletException | IOException e) {
            throw new RuntimeException(e);
        } finally {
            RequestContext.start(); // You might want to check if this is the right place for this call
        }
    }
}

