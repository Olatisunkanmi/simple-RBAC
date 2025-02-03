import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppAbility } from '../ability.types';
import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';
import { Actions, RESOURCES } from 'src/common';

// @Injectable()
// export class CaslAbilityFactory {
//   constructor(private prisma: PrismaService) {}

//   async createForUser(token: any) {
//     const { can, cannot, build } = new AbilityBuilder<AppAbility>(
//       PureAbility as AbilityClass<AppAbility>,
//     );

//     const userWithRoles = await this.prisma.userRole.findFirst({
//       where: { userId: token.sub },
//       include: {
//         role: {
//           include: {
//             permissions: {
//               include: {
//                 fields: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     if (userWithRoles && userWithRoles.role) {
//       userWithRoles.role.permissions.forEach((perm) => {
//         const action = perm.action as Actions;
//         const resource = perm.resource as RESOURCES;

//         if (perm.fields && perm.fields.length > 0) {
//           //Extrac fields from permission
//           const fields = perm.fields.map((field) => field.name);

//           // if(perm.conditions){


//           // }

//           can(action, resource, fields)
//         }
//       });
//     }

//     return build();
//   }
// }

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

          // Extract fields from permission
          const fields = perm.fields.map((field) => field.name);
          can(action, resource, fields);
        } else {
          can(action, resource);
        }
      });
    }
    return build({
      fieldMatcher: (fields: any) => {
        return function matchField(field: string) {
          if (!fields || fields.length === 0) return true;
          return fields.includes(field);
        };
      },
    });
  }
}
