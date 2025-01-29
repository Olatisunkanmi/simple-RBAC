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

    const userWithRoles = await this.prisma.userRole.findFirst({
      where: { userId: token.sub },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });

    if (userWithRoles && userWithRoles.role) {
      userWithRoles.role.permissions.forEach((permission) => {
        const action = permission.action as Actions;
        const resource = permission.resource as RESOURCES;

        
        // if (permission.fields && permission.fields.create) {
        //   const fields = permission.fields.create.map((field) => field.name);

        //   if (permission.conditions) {
        //     can(action, resource, permission.conditions, fields);
        //   } else {
        //     can(action, resource, fields);
        //   }
        // } else {
        //   if (permission.conditions) {
        //     can(action, resource, permission.conditions);
        //   } else {
        //     can(action, resource);
        //   }
        // }
      });
    }

    return build();
  }
}