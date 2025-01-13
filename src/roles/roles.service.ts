import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateRole, IUpdateRole } from './interface/role.interface';
import { PermissionsService } from './permission.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(
    private prisma: PrismaService,
    private permissionsService: PermissionsService,
  ) {}

  async createRole(dto: ICreateRole) {
    const { name, permissions } = dto;
    let Role: any;

    for (const permission of permissions) {
      const { resource: resources, actions } = permission;

      await Promise.all(
        resources.map((resource) =>
          this.permissionsService.createResourcePermissions(resource, actions),
        ),
      );

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

  async userHasRole(userId: string, role: any): Promise<boolean | number> {
    return (
      (await this.prisma.role.count({
        where: {
          userId,
          // type: role,
        },
      })) > 0
    );
  }

  async removeRole(userId: string, role: any): Promise<void> {
    await this.prisma.role.deleteMany({
      where: {
        userId,
        // type: role,
      },
    });
  }

  async getUserRoles(userId: string): Promise<any[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        userId,
      },
      select: {
        // type: true,
      },
    });
    return roles.map((role) => role);
  }

  async countUsersWithRole(role: any): Promise<number> {
    const count = await this.prisma.role.count({
      where: {
        // type: role,
      },
    });
    return count;
  }

  async listUsersWithRole(role: any): Promise<string[]> {
    const users = await this.prisma.role.findMany({
      where: {
        // type: role,
      },
      select: {
        userId: true,
      },
    });
    return users.map((user) => user.userId);
  }

  async getRolePermissions(roleId: string) {}

  async findOne(id: string) {
    return this.prisma.role.findFirst({
      where: { id },
    });
  }

  async fetchAllRoles() {
    return await this.prisma.role.findMany({});
  }

  async getById(id: string) {
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

  async assignRoleToUser(userId: string, roleId: string) {
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

  async updateRole(roleId: string, dto: IUpdateRole) {
    const { name, permissions } = dto;

    const existingRole = await this.prisma.role.findUnique({
      where: { id: roleId },
      include: {
        permissions: true,
        userPermissions: true,
      },
    });

    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    try {
      return await this.prisma.$transaction(async (prisma) => {
        let updatedRole;

        if (name && name !== existingRole.name) {
          const nameExists = await prisma.role.findFirst({
            where: {
              name,
              id: { not: roleId }, // Exclude current role
            },
            // select: {
            //   name: true
            // }
          });

          if (nameExists) {
            throw new BadRequestException('Role name already exists');
          }

          updatedRole = await prisma.role.update({
            where: { id: roleId },
            data: { name },
          });
        }

        // Update permissions if provided
        if (permissions) {
          for (const permission of permissions) {
            const { resource: resources, actions } = permission;

            await Promise.all(
              resources.map((resource) =>
                this.permissionsService.createResourcePermissions(
                  resource,
                  actions,
                ),
              ),
            );
          }
          // await prisma.permission.createMany({
          //   data: permissions.map((permission) => ({
          //     resource: permission.resource,
          //     action: permission.actions,
          //     conditions: permission.conditions || {},
          //   })),
          //   skipDuplicates: true,
          // });

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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle specific Prisma errors
        if (error.code === 'P2002') {
          throw new BadRequestException('Unique constraint violation');
        }
      }
      throw error;
    }
  }
}
