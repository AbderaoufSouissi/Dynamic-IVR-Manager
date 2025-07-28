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
               'SYSTEM_ROLE',
               SYSTIMESTAMP,
               SYSTIMESTAMP,
               system_user_id,  -- Created by SYSTEM_USER (0)
               system_user_id   -- Updated by SYSTEM_USER (0)
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
               'SYSTEM_USER',
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
    INSERT INTO PERMISSIONS (PERMISSION_ID, PERMISSION_NAME, description, created_at, updated_at, CREATED_BY_ID,UPDATED_BY_ID)
    SELECT SHARED_ID_SEQ.NEXTVAL, p_name, p_desc, SYSTIMESTAMP, SYSTIMESTAMP, system_user_id, system_user_id
    FROM (
             SELECT 'CREATE_USER' AS p_name, 'Create User' AS p_desc FROM DUAL UNION ALL
             SELECT 'UPDATE_USER', 'Update User' FROM DUAL UNION ALL
             SELECT 'DELETE_USER', 'Delete User' FROM DUAL UNION ALL
             SELECT 'CREATE_ROLE', 'Create Role' FROM DUAL UNION ALL
             SELECT 'UPDATE_ROLE', 'Update Role' FROM DUAL UNION ALL
             SELECT 'DELETE_ROLE', 'Delete Role' FROM DUAL UNION ALL
             SELECT 'CREATE_PERMISSION', 'Create Permission' FROM DUAL UNION ALL
             SELECT 'DELETE_PERMISSION', 'Delete Permission' FROM DUAL UNION ALL
             SELECT 'BLACKLIST_CUSTOMER', 'Blacklist Customer' FROM DUAL UNION ALL
             SELECT 'WHITELIST_CUSTOMER', 'Whitelist Customer' FROM DUAL UNION ALL
             SELECT 'RESET_NB_CALLS', 'Reset Number of Calls' FROM DUAL
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