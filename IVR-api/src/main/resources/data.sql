-- First disable all foreign key constraints
BEGIN
    FOR c IN (SELECT constraint_name, table_name FROM user_constraints WHERE constraint_type = 'R') LOOP
            EXECUTE IMMEDIATE 'ALTER TABLE ' || c.table_name || ' DISABLE CONSTRAINT ' || c.constraint_name;
        END LOOP;
    DBMS_OUTPUT.PUT_LINE('Foreign key constraints disabled');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error disabling constraints: ' || SQLERRM);
END;
/

-- Now truncate tables in proper order (child tables first)
TRUNCATE TABLE ROLE_PERMISSIONS;
TRUNCATE TABLE PERMISSIONS;
TRUNCATE TABLE APP_USERS;
TRUNCATE TABLE ROLES;




-- Proceed with your initialization
DECLARE
    system_role_id NUMBER;
    system_user_id NUMBER := 0;  -- Fixed ID for system user
BEGIN
    -- Get ID 0 for system user

    -- Get ID 1 for system role
    SELECT SHARED_ID_SEQ.NEXTVAL INTO system_role_id FROM DUAL;

    -- Insert SYSTEM_ROLE with ID 1
    INSERT INTO ROLES (
        ROLE_ID,
        role_name,
        created_at,
        updated_at,
        CREATED_BY_ID,
        UPDATED_BY_ID
    )
    VALUES (
               system_role_id,
               'system',
               SYSTIMESTAMP,
               SYSTIMESTAMP,
               system_user_id,
               system_user_id
           );

    -- Insert SYSTEM_USER with ID 0
    INSERT INTO APP_USERS (
        user_id,
        username,
        password,
        email,
        first_name,
        last_name,
        IS_ACTIVE,
        created_at,
        updated_at,
        CREATED_BY_ID,
        UPDATED_BY_ID,
        role_id
    )
    VALUES (
               system_user_id,
               'system',
               '$2a$10$QYc.TUCTnY1.B3U8YhKsAOegXPueiJ7NKhXOXbV3Li2Mskh0wradq', -- system
               'system@system',
               'system',
               'system',
               1,
               SYSTIMESTAMP,
               SYSTIMESTAMP,
               system_user_id,  -- Self-created
               system_user_id,  -- Self-updated
               system_role_id   -- Role ID 1
           );

    -- Insert permissions (will continue from ID 2)
    INSERT INTO PERMISSIONS (PERMISSION_ID, PERMISSION_NAME, description, created_at, updated_at, CREATED_BY_ID, UPDATED_BY_ID)
    SELECT SHARED_ID_SEQ.NEXTVAL, p_name, p_desc, SYSTIMESTAMP, SYSTIMESTAMP, system_user_id, system_user_id
    FROM (
             SELECT 'create:users'         AS p_name, 'Créer des utilisateurs'              AS p_desc FROM DUAL UNION ALL
             SELECT 'update:users'         AS p_name, 'Modifier des utilisateurs'      AS p_desc FROM DUAL UNION ALL
             SELECT 'create:roles'         AS p_name, 'Créer des rôles'                     AS p_desc FROM DUAL UNION ALL
             SELECT 'update:roles'         AS p_name, 'Modifer des rôles'            AS p_desc FROM DUAL UNION ALL
             SELECT 'delete:roles'         AS p_name, 'Supprimer les rôles'                AS p_desc FROM DUAL UNION ALL
             SELECT 'create:permissions'   AS p_name, 'Créer des permissions'             AS p_desc FROM DUAL UNION ALL
             SELECT 'delete:permissions'   AS p_name, 'Supprimer des permissions'         AS p_desc FROM DUAL UNION ALL
             SELECT 'blacklist:msisdn'  AS p_name, 'Blacklister un MSISDN'            AS p_desc FROM DUAL UNION ALL
             SELECT 'whitelist:msisdn'  AS p_name, 'Whitelister un MSISDN'            AS p_desc FROM DUAL UNION ALL
             SELECT 'reset:msisdn' AS p_name, 'Réinitialiser le nombre d’appels d’un MSISDN' AS p_desc FROM DUAL
         );

    -- Assign all permissions to SYSTEM_ROLE
    INSERT INTO ROLE_PERMISSIONS (ROLE_ID, PERMISSION_ID)
    SELECT system_role_id, PERMISSION_ID FROM PERMISSIONS;

    DBMS_OUTPUT.PUT_LINE('System user created with ID: ' || system_user_id);
    DBMS_OUTPUT.PUT_LINE('System role created with ID: ' || system_role_id);
END;
/

-- Re-enable constraints
BEGIN
    FOR c IN (SELECT constraint_name, table_name FROM user_constraints WHERE constraint_type = 'R') LOOP
            EXECUTE IMMEDIATE 'ALTER TABLE ' || c.table_name || ' ENABLE CONSTRAINT ' || c.constraint_name;
        END LOOP;
    DBMS_OUTPUT.PUT_LINE('Foreign key constraints re-enabled');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error enabling constraints: ' || SQLERRM);
END;
/

COMMIT;