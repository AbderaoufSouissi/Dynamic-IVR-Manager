package com._CServices.IVR_api.config;

import com._CServices.IVR_api.domain.RequestContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

@Configuration
public class AuditorAwareImpl implements AuditorAware<Long> {

    @Override
    public Optional<Long> getCurrentAuditor() {
        return Optional.ofNullable(RequestContext.getUserId());
    }
}
