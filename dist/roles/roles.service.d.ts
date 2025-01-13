import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateRole, IUpdateRole } from './interface/role.interface';
import { PermissionsService } from './permission.service';
import { Prisma } from '@prisma/client';
export declare class RolesService {
    private prisma;
    private permissionsService;
    constructor(prisma: PrismaService, permissionsService: PermissionsService);
    createRole(dto: ICreateRole): Promise<any>;
    userHasRole(userId: string, role: any): Promise<boolean | number>;
    removeRole(userId: string, role: any): Promise<void>;
    getUserRoles(userId: string): Promise<any[]>;
    countUsersWithRole(role: any): Promise<number>;
    listUsersWithRole(role: any): Promise<string[]>;
    getRolePermissions(roleId: string): Promise<void>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    fetchAllRoles(): Promise<{
        id: string;
        name: string;
        description: string | null;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getById(id: string): Promise<{
        permissions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            action: string;
            resource: string;
            conditions: Prisma.JsonValue | null;
        }[];
        users: {
            id: string;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    assignRoleToUser(userId: string, roleId: string): Promise<{
        id: string;
    }>;
    updateRole(roleId: string, dto: IUpdateRole): Promise<any>;
}
