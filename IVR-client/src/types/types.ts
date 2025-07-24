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

export interface UserRequest{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    roleName: string;
    active: boolean;

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

export interface Audit {
    auditId: number
    userId: number
    actionType: string
    entityId: number
    actionTimestamp: string
}