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
//           // Extract fields from permission
//           const fields = perm.fields.map((field) => field.name);

//           can(action, resource, fields);
//         } else {
//           //deny acess by default no user has 100% access
//           can(action, resource);
//         }
//       });
//     }

//      const fieldMatcher: FieldMatcher = (fields) => (field) =>
//       fields.includes(field);

//     return build({
//       fieldMatcher: (fields: any) => {
//         console.log(fields);
//         return function matchField(field: string) {
//           if (!fields || fields.length === 0) return true;
//           return fields.includes(field);
//         };
//       },
//     });
//     // return build({ fieldMatcher });

//   }
// }

@Injectable()
export class CaslAbilityFactory {
  // console console(CaslAbilityFactory.name);

  constructor(private prisma: PrismaService) {}

  async createForUser(token: any) {
    // console.log('Creating Ability for User', { userId: token?.sub });

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

    // console.log('User Roles Fetched', {
    //   hasRoles: !!userWithRoles?.role,
    //   permissionsCount: userWithRoles?.role?.permissions?.length || 0,
    // });

    if (userWithRoles && userWithRoles.role) {
      userWithRoles.role.permissions.forEach((perm) => {
        const action = perm.action as Actions;
        const resource = perm.resource as RESOURCES;

        // console.log('Processing Permission', {
        //   action,
        //   resource,
        //   hasFields: !!perm.fields?.length,
        // });

        if (perm.fields && perm.fields.length > 0) {
          const fields = perm.fields.map((field) => field.name);
          // console.log('Adding Scoped Permission', {
          //   action,
          //   resource,
          //   fields,
          // });
          can(action, resource, fields);
        } else {
          // console.log('Adding Full Permission', {
          //   action,
          //   resource,
          // });
          can(action, resource);
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
