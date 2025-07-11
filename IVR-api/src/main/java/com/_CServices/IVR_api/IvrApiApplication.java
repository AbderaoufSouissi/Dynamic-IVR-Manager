package com._CServices.IVR_api;

import com._CServices.IVR_api.dao.RoleRepository;
import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.entity.Role;
import com._CServices.IVR_api.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;

@SpringBootApplication
@Slf4j
public class IvrApiApplication {

	public static void main(String[] args) {

		SpringApplication.run(IvrApiApplication.class, args);
	}


	@Bean
	CommandLineRunner initDb(UserRepository userRepository, RoleRepository roleRepository) {
		return args -> {

			if(!userRepository.existsByUsername("SYSTEM")){
				Role systemRole = Role.builder()
						.name("SYSTEM_ROLE")
						.permissions(new HashSet<>())
						.build();
				roleRepository.save(systemRole);
				log.info("Created Role {}", systemRole.getName());


				User systemUser = User.builder()
						.username("SYSTEM")
						.password("SYSTEM")
						.email("system@system")
						.firstName("SYSTEM")
						.lastName("SYSTEM")
						.active(true)
						.role(systemRole)
						.build();
				userRepository.save(systemUser);

				log.info("Created User {}", systemUser.getUsername());

			};};
	}

}

