import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppAbility } from '../ability.types';
import {
  AbilityBuilder,
  AbilityClass,
  FieldMatcher,
  PureAbility,
} from '@casl/ability';
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
            permissions: {
              include: {
                fields: true,
              },
            },
          },
        },
      },
    });

    if (userWithRoles && userWithRoles.role) {
      userWithRoles.role.permissions.forEach((perm) => {
        const action = perm.action as Actions;
        const resource = perm.resource as RESOURCES;

        if (perm.fields && perm.fields.length > 0) {
          const fields = perm.fields.map((field) => field.name);

          console.log(perm);

          console.log(fields);
          can(action, resource, fields);
        }
      });
    }

    return build({
      fieldMatcher: (fields: string[]) => {
        console.log('Field Matcher Called', { fields });
        return function matchField(field: string) {
          if (!fields || fields.length === 0) return true;
          const canAccess = fields.includes(field);
          return canAccess;
        };
      },
    });
  }
}
