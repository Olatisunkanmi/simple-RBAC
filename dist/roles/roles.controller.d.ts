import { CreateRoleDto, UpdateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    updateRole(roleId: string, dto: UpdateRoleDto): Promise<any>;
    createRole(dto: CreateRoleDto): Promise<any>;
    assignToUser(userId: string, roleId: string): Promise<{
        id: string;
    }>;
    fetchAllRoles(): Promise<{
        id: string;
        name: string;
        description: string | null;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findRolebyId(roleId: string): Promise<{
        users: {
            id: string;
        }[];
        permissions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            action: string;
            resource: string;
            conditions: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
