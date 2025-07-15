package com._CServices.IVR_api.config;

import org.springframework.context.annotation.Configuration;

import org.springframework.data.jpa.repository.config.EnableJpaAuditing;





@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl") // matches @Component("auditorAwareImpl")
public class JpaAuditingConfig {
}
