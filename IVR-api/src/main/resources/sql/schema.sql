create sequence id_seq start with 1 increment by 1;
create table app_users (created_at timestamp(6) not null, created_by number(19,0) not null, id number(19,0) not null, role_id number(19,0), updated_at timestamp(6) not null, updated_by number(19,0) not null, email varchar2(255 char) not null unique, password varchar2(255 char) not null, username varchar2(255 char) not null unique, primary key (id));
create table permissions (created_at timestamp(6) not null, created_by number(19,0) not null, id number(19,0) not null, updated_at timestamp(6) not null, updated_by number(19,0) not null, permission_name varchar2(255 char) not null unique, primary key (id));
create table role_permissions (permission_id number(19,0) not null, role_id number(19,0) not null, primary key (permission_id, role_id));
create table roles (created_at timestamp(6) not null, created_by number(19,0) not null, id number(19,0) not null, updated_at timestamp(6) not null, updated_by number(19,0) not null, name varchar2(255 char) not null unique, primary key (id));
alter table app_users add constraint FK7sipqsfa0da9aj10gga1iqnk1 foreign key (role_id) references roles;
alter table role_permissions add constraint FKegdk29eiy7mdtefy5c7eirr6e foreign key (permission_id) references permissions;
alter table role_permissions add constraint FKn5fotdgk8d1xvo8nav9uv3muc foreign key (role_id) references roles;
