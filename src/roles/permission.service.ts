import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Actions } from 'src/common';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async createPermission(data: {
    action: string;
    resource: string;
    conditions?: any;
  }) {
    return this.prisma.permission.create({
      data: {
        action: data.action,
        resource: data.resource,
        conditions: data.conditions,
      },
    });
  }

  async createResourcePermissions(resource: string, actions: Actions[]) {
    let permissionsActions: Actions[] = [];

    if (actions.length === 0) {
      permissionsActions = Object.values(Actions);
    } else {
      permissionsActions = actions;
    }

    return await this.prisma.permission.createMany({
      data: permissionsActions.map((action) => ({
        action,
        resource,
        conditions: null,
      })),
      skipDuplicates: true,
    });
  }
}
