package com._CServices.IVR_api.config;

import com._CServices.IVR_api.repository.users.UserRepository;
import com._CServices.IVR_api.domain.RequestContext;
import com._CServices.IVR_api.entity.User;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component("auditorAwareImpl") // bean name must match config
@RequiredArgsConstructor
public class AuditorAwareImpl implements AuditorAware<User> {

    private final UserRepository userRepository;

    @Override
    public Optional<User> getCurrentAuditor() {
        Long userId = RequestContext.getUserId();

        if (userId == null) return Optional.empty();

        return userRepository.findById(userId);
    }
}


