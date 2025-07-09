package com._CServices.IVR_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaAuditing
public class IvrApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(IvrApiApplication.class, args);
	}

}
