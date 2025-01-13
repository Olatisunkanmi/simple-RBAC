"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const permission_service_1 = require("./permission.service");
const client_1 = require("@prisma/client");
let RolesService = class RolesService {
    constructor(prisma, permissionsService) {
        this.prisma = prisma;
        this.permissionsService = permissionsService;
    }
    async createRole(dto) {
        const { name, permissions } = dto;
        let Role;
        for (const permission of permissions) {
            const { resource: resources, actions } = permission;
            await Promise.all(resources.map((resource) => this.permissionsService.createResourcePermissions(resource, actions)));
            const permit = await this.prisma.permission.findMany({
                where: {
                    action: { in: actions },
                    resource: {
                        in: resources,
                    },
                },
            });
            Role = await this.prisma.role.upsert({
                where: {
                    name,
                },
                create: {
                    name,
                    permissions: {
                        connect: permit.map((p) => ({ id: p.id })),
                    },
                },
                update: {
                    permissions: {
                        connect: permit.map((p) => ({ id: p.id })),
                    },
                },
                include: {
                    permissions: true,
                },
            });
        }
        return Role;
    }
    async userHasRole(userId, role) {
        return ((await this.prisma.role.count({
            where: {
                userId,
            },
        })) > 0);
    }
    async removeRole(userId, role) {
        await this.prisma.role.deleteMany({
            where: {
                userId,
            },
        });
    }
    async getUserRoles(userId) {
        const roles = await this.prisma.role.findMany({
            where: {
                userId,
            },
            select: {},
        });
        return roles.map((role) => role);
    }
    async countUsersWithRole(role) {
        const count = await this.prisma.role.count({
            where: {},
        });
        return count;
    }
    async listUsersWithRole(role) {
        const users = await this.prisma.role.findMany({
            where: {},
            select: {
                userId: true,
            },
        });
        return users.map((user) => user.userId);
    }
    async getRolePermissions(roleId) { }
    async findOne(id) {
        return this.prisma.role.findFirst({
            where: { id },
        });
    }
    async fetchAllRoles() {
        return await this.prisma.role.findMany({});
    }
    async getById(id) {
        return await this.prisma.role.findUnique({
            where: {
                id,
            },
            include: {
                permissions: true,
                users: { select: { id: true } },
            },
        });
    }
    async assignRoleToUser(userId, roleId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                roles: {
                    connect: { id: roleId },
                },
            },
            select: {
                id: true,
            },
        });
    }
    async updateRole(roleId, dto) {
        const { name, permissions } = dto;
        const existingRole = await this.prisma.role.findUnique({
            where: { id: roleId },
            include: {
                permissions: true,
                userPermissions: true,
            },
        });
        if (!existingRole) {
            throw new common_1.NotFoundException('Role not found');
        }
        try {
            return await this.prisma.$transaction(async (prisma) => {
                let updatedRole;
                if (name && name !== existingRole.name) {
                    const nameExists = await prisma.role.findFirst({
                        where: {
                            name,
                            id: { not: roleId },
                        },
                    });
                    if (nameExists) {
                        throw new common_1.BadRequestException('Role name already exists');
                    }
                    updatedRole = await prisma.role.update({
                        where: { id: roleId },
                        data: { name },
                    });
                }
                if (permissions) {
                    for (const permission of permissions) {
                        const { resource: resources, actions } = permission;
                        await Promise.all(resources.map((resource) => this.permissionsService.createResourcePermissions(resource, actions)));
                    }
                    if (existingRole.userPermissions.length > 0) {
                        await prisma.userRolePermission.updateMany({
                            where: { roleId },
                            data: {
                                updatedAt: new Date(),
                            },
                        });
                    }
                    return await prisma.role.findUnique({
                        where: { id: roleId },
                        include: {
                            permissions: true,
                        },
                    });
                }
                return updatedRole;
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.BadRequestException('Unique constraint violation');
                }
            }
            throw error;
        }
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        permission_service_1.PermissionsService])
], RolesService);
//# sourceMappingURL=roles.service.js.map