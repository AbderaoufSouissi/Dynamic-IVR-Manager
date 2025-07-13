package com._CServices.IVR_api;

import com._CServices.IVR_api.dao.AuditRepository;
import com._CServices.IVR_api.dao.PermissionsRepository;
import com._CServices.IVR_api.dao.RoleRepository;
import com._CServices.IVR_api.dao.UserRepository;
import com._CServices.IVR_api.entity.Permissions;
import com._CServices.IVR_api.entity.Role;
import com._CServices.IVR_api.entity.User;
import com._CServices.IVR_api.enumeration.ActionType;
import com._CServices.IVR_api.service.AuditService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

import static com._CServices.IVR_api.enumeration.ActionType.*;

@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
public class IvrApiApplication {
	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PermissionsRepository permissionsRepository;
	private final PasswordEncoder passwordEncoder;



	public static void main(String[] args) {

		SpringApplication.run(IvrApiApplication.class, args);
	}


	@Bean
	CommandLineRunner initDb() {
		return args -> {
			Set<Permissions> SYSTEM_PERMISSIONS = new HashSet<>();

			if(!userRepository.existsByUsername("SYSTEM")){
				final Permissions CREATE_USER_PERMISSION = Permissions.builder()
						.name(ActionType.CREATE_USER.toString())
						.description(ActionType.CREATE_USER.getValue())
						.build();

				SYSTEM_PERMISSIONS.add(CREATE_USER_PERMISSION);
				permissionsRepository.save(CREATE_USER_PERMISSION);
				log.info("created CREATE_USER_PERMISSION");

				final Permissions UPDATE_USER_PERMISSION = Permissions.builder()
						.name(ActionType.UPDATE_USER.toString())
						.description(ActionType.UPDATE_USER.getValue())
						.build();

				SYSTEM_PERMISSIONS.add(UPDATE_USER_PERMISSION);
				permissionsRepository.save(UPDATE_USER_PERMISSION);
				log.info("created UPDATE_USER_PERMISSION");

				final Permissions DELETE_USER_PERMISSION = Permissions.builder()
						.name(ActionType.DELETE_USER.toString())
						.description(ActionType.DELETE_USER.getValue())
						.build();

				SYSTEM_PERMISSIONS.add(DELETE_USER_PERMISSION);
				permissionsRepository.save(DELETE_USER_PERMISSION);
				log.info("created DELETE_USER_PERMISSION");

				final Permissions CREATE_ROLE_PERMISSION = Permissions.builder()
						.name(ActionType.CREATE_ROLE.toString())
						.description(ActionType.CREATE_ROLE.getValue())
						.build();

				SYSTEM_PERMISSIONS.add(CREATE_ROLE_PERMISSION);
				permissionsRepository.save(CREATE_ROLE_PERMISSION);
				log.info("created CREATE_ROLE_PERMISSION");

				final Permissions UPDATE_ROLE_PERMISSION = Permissions.builder()
						.name(ActionType.UPDATE_ROLE.toString())
						.description(ActionType.UPDATE_ROLE.getValue())
						.build();

				SYSTEM_PERMISSIONS.add(UPDATE_ROLE_PERMISSION);
				permissionsRepository.save(UPDATE_ROLE_PERMISSION);
				log.info("created UPDATE_ROLE_PERMISSION");

				final Permissions DELETE_ROLE_PERMISSION = Permissions.builder()
						.name(ActionType.DELETE_ROLE.toString())
						.description(ActionType.DELETE_ROLE.getValue())
						.build();

				SYSTEM_PERMISSIONS.add(DELETE_ROLE_PERMISSION);
				permissionsRepository.save(DELETE_ROLE_PERMISSION);
				log.info("created DELETE_ROLE_PERMISSION");

				final Permissions CREATE_PERMISSION_PERMISSION = Permissions.builder()
						.name(CREATE_PERMISSION.toString())
						.description(CREATE_PERMISSION.getValue())
						.build();

				SYSTEM_PERMISSIONS.add(CREATE_PERMISSION_PERMISSION);
				permissionsRepository.save(CREATE_PERMISSION_PERMISSION);
				log.info("created CREATE_PERMISSION_PERMISSION");

				final Permissions DELETE_PERMISSION_PERMISSION = Permissions.builder()
						.name(DELETE_PERMISSION.toString())
						.description(DELETE_PERMISSION.getValue())
						.build();

				SYSTEM_PERMISSIONS.add(DELETE_PERMISSION_PERMISSION);
				permissionsRepository.save(DELETE_PERMISSION_PERMISSION);
				log.info("created DELETE_PERMISSION_PERMISSION");

				Permissions BLACKLIST_CUSTOMER_PERMISSION = Permissions.builder()
						.name(BLACKLIST_CUSTOMER.toString())
						.description(BLACKLIST_CUSTOMER.getValue())
						.build();

				SYSTEM_PERMISSIONS.add(BLACKLIST_CUSTOMER_PERMISSION);
				permissionsRepository.save(BLACKLIST_CUSTOMER_PERMISSION);
				log.info("created BLACKLIST_CUSTOMER_PERMISSION");

				Permissions WHITELIST_CUSTOMER_PERMISSION = Permissions.builder()
						.name(WHITELIST_CUSTOMER.toString())
						.description(WHITELIST_CUSTOMER.getValue())
						.build();

				SYSTEM_PERMISSIONS.add(WHITELIST_CUSTOMER_PERMISSION);
				permissionsRepository.save(WHITELIST_CUSTOMER_PERMISSION);
				log.info("created WHITELIST_CUSTOMER_PERMISSION");

				Permissions RESET_NB_CALLS_PERMISSION = Permissions.builder()
						.name(RESET_NB_CALLS.toString())
						.description(RESET_NB_CALLS.getValue())
						.build();

				SYSTEM_PERMISSIONS.add(RESET_NB_CALLS_PERMISSION);
				permissionsRepository.save(RESET_NB_CALLS_PERMISSION);
				log.info("created RESET_NB_CALLS_PERMISSION");


				final Role SYSTEM_ROLE = Role.builder()
						.name("SYSTEM_ROLE")
						.permissions(SYSTEM_PERMISSIONS)
						.build();

				roleRepository.save(SYSTEM_ROLE);

				log.info("Created Role {}", SYSTEM_ROLE.getName());


				User SYSTEM_USER = User.builder()
						.username("SYSTEM_USER")
						.password(passwordEncoder.encode("system"))
						.email("system@system")
						.firstName("system")
						.lastName("system")
						.active(true)
						.role(SYSTEM_ROLE)
						.build();
				userRepository.save(SYSTEM_USER);

				log.info("Created User {}", SYSTEM_USER.getUsername());

			};};
	}

}

