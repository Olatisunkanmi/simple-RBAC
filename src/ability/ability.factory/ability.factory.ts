import { Injectable } from '@nestjs/common';
import { AbilityBuilder, PureAbility, AbilityClass } from '@casl/ability';
import { User, Permission, AccessToken } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppAbility } from '../ability.types';
import { Actions, RESOURCES } from 'src/common';

@Injectable()
export class CaslAbilityFactory {
  constructor(private prisma: PrismaService) {}

  async createForUser(token: any) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );

    const userWithRoles = await this.prisma.user.findUnique({
      where: { id: token.sub },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });

    userWithRoles.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        const action = permission.action as Actions;
        const resource = permission.resource as RESOURCES;

        if (permission.conditions) {
          console.log(permission.conditions);
          can(action, resource, permission.conditions as object);
        } else {
          can(action, resource);
        }
      });
    });

    return build();
  }
}
