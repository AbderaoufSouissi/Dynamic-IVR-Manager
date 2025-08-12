CREATE SEQUENCE shared_id_seq START WITH 0 INCREMENT BY 1;

CREATE TABLE app_users
(
    user_id       NUMBER(38, 0) NOT NULL,
    created_at    TIMESTAMP NOT NULL,
    updated_at    TIMESTAMP,
    created_by_id NUMBER(38, 0) NOT NULL,
    updated_by_id NUMBER(38, 0),
    username      VARCHAR2(255) NOT NULL,
    first_name    VARCHAR2(255) NOT NULL,
    last_name     VARCHAR2(255) NOT NULL,
    password      VARCHAR2(255) NOT NULL,
    email         VARCHAR2(255) NOT NULL,
    is_active     NUMBER(1)     NOT NULL,
    role_id       NUMBER(38, 0),
    CONSTRAINT pk_app_users PRIMARY KEY (user_id)
);

CREATE TABLE general_audit
(
    audit_id          NUMBER(38, 0) NOT NULL,
    action_type       VARCHAR2(255) NOT NULL,
    msisdn            VARCHAR2(255),
    action_time_stamp TIMESTAMP,
    user_id           NUMBER(38, 0),
    entity_type       VARCHAR2(255),
    entity_id         NUMBER(38, 0),
    CONSTRAINT pk_general_audit PRIMARY KEY (audit_id)
);

CREATE TABLE permissions
(
    permission_id   NUMBER(38, 0) NOT NULL,
    created_at      TIMESTAMP NOT NULL,
    updated_at      TIMESTAMP,
    created_by_id   NUMBER(38, 0) NOT NULL,
    updated_by_id   NUMBER(38, 0),
    permission_name VARCHAR2(255) NOT NULL,
    description     VARCHAR2(255),
    CONSTRAINT pk_permissions PRIMARY KEY (permission_id)
);

CREATE TABLE role_permissions
(
    permission_id NUMBER(38, 0) NOT NULL,
    role_id       NUMBER(38, 0) NOT NULL,
    CONSTRAINT pk_role_permissions PRIMARY KEY (permission_id, role_id)
);

CREATE TABLE roles
(
    role_id       NUMBER(38, 0) NOT NULL,
    created_at    TIMESTAMP NOT NULL,
    updated_at    TIMESTAMP,
    created_by_id NUMBER(38, 0) NOT NULL,
    updated_by_id NUMBER(38, 0),
    role_name     VARCHAR2(50)  NOT NULL,
    CONSTRAINT pk_roles PRIMARY KEY (role_id)
);

ALTER TABLE app_users
    ADD CONSTRAINT uc_app_users_email UNIQUE (email);

ALTER TABLE app_users
    ADD CONSTRAINT uc_app_users_username UNIQUE (username);

ALTER TABLE permissions
    ADD CONSTRAINT uc_permissions_permission_name UNIQUE (permission_name);

ALTER TABLE roles
    ADD CONSTRAINT uc_roles_role_name UNIQUE (role_name);

ALTER TABLE app_users
    ADD CONSTRAINT FK_APP_USERS_ON_CREATED_BY FOREIGN KEY (created_by_id) REFERENCES app_users (user_id);

ALTER TABLE app_users
    ADD CONSTRAINT FK_APP_USERS_ON_ROLE FOREIGN KEY (role_id) REFERENCES roles (role_id);

ALTER TABLE app_users
    ADD CONSTRAINT FK_APP_USERS_ON_UPDATED_BY FOREIGN KEY (updated_by_id) REFERENCES app_users (user_id);

ALTER TABLE general_audit
    ADD CONSTRAINT FK_GENERAL_AUDIT_ON_USER FOREIGN KEY (user_id) REFERENCES app_users (user_id);

ALTER TABLE permissions
    ADD CONSTRAINT FK_PERMISSIONS_ON_CREATED_BY FOREIGN KEY (created_by_id) REFERENCES app_users (user_id);

ALTER TABLE permissions
    ADD CONSTRAINT FK_PERMISSIONS_ON_UPDATED_BY FOREIGN KEY (updated_by_id) REFERENCES app_users (user_id);

ALTER TABLE roles
    ADD CONSTRAINT FK_ROLES_ON_CREATED_BY FOREIGN KEY (created_by_id) REFERENCES app_users (user_id);

ALTER TABLE roles
    ADD CONSTRAINT FK_ROLES_ON_UPDATED_BY FOREIGN KEY (updated_by_id) REFERENCES app_users (user_id);

ALTER TABLE role_permissions
    ADD CONSTRAINT fk_role_permissions_role FOREIGN KEY (role_id) REFERENCES roles (role_id);

ALTER TABLE role_permissions
    ADD CONSTRAINT fk_role_permissions_rolescIHFO FOREIGN KEY (permission_id) REFERENCES permissions (permission_id);