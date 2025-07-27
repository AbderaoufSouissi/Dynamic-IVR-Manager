export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    roleName: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    active: boolean;

}

export interface CreateUserRequest{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    roleName: string | null;
    active: boolean;

}

export interface UpdateUserRequest{
    firstName: string | null,
    lastName: string | null,
    username: string | null,
    email: string | null,
    password: string | null,
    active: boolean,
    roleName: string | null,
}

export interface RoleRequest {
    name: string
    permissions: string[]
}

export interface Role {
    roleId: number
    name: string
    permissions: string[]
    createdAt: string; 
    createdBy: string
    updatedAt: string;
    updatedBy: string;
}

export interface Permission {
    permissionId: number
    name: string
    description: string
    createdAt: string; 
    createdBy: string
    updatedAt: string;
    updatedBy: string;
}

export interface PermissionRequest {
    name: string
    description: string

}

export interface Audit {
    auditId: number
    userId: number
    actionType: string
    entityType: string
    entityId: number
    actionTimestamp: string
}