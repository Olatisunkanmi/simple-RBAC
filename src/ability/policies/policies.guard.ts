import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../ability.factory/ability.factory';
import { CHECK_POLICIES_KEY } from '../decorator/check-policies.decorator';
import { AppAbility, PolicyHandler } from '../ability.types';
import { Actions } from 'src/common';

// @Injectable()
// export class PoliciesGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private caslAbilityFactory: CaslAbilityFactory,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const policyHandlers =
//       this.reflector.get<PolicyHandler[]>(
//         CHECK_POLICIES_KEY,
//         context.getHandler(),
//       ) || [];

//     const { user } = context.switchToHttp().getRequest();
//     const request = context.switchToHttp().getRequest();

//     const path = request.route.path;
//     console.log({
//       path: request.route.path,
//       method: request.method,
//       fullUrl: request.originalUrl,
//       baseUrl: request.baseUrl,
//       params: request.params,
//       query: request.query,
//     });

//     const resource = path.split('/')[2];

//     const ability = await this.caslAbilityFactory.createForUser(user);

//     // const resource = this.getResourceFromRequest(request);
//     const action = this.getActionFromRequest(request);

//     console.log(ability);

//     if (!ability.can(action, resource)) {
//       throw new ForbiddenException(
//         'You do not have permission to perform this action',
//       );
//     }

//     return policyHandlers.every((handler) =>
//       this.execPolicyHandler(handler, ability),
//     );
//   }

//   private getActionFromRequest(request: Request): Actions {
//     // Map HTTP methods to CASL actions
//     switch (request.method.toLowerCase()) {
//       case 'get':
//         return Actions.Read;
//       case 'post':
//         return Actions.Create;
//       case 'put':
//       case 'patch':
//         return Actions.Update;
//       case 'delete':
//         return Actions.Delete;
//       default:
//         return Actions.Read;
//     }
//   }

//   private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
//     if (typeof handler === 'function') {
//       return handler(ability);
//     }
//     return handler.handle(ability);
//   }
// }

@Injectable()
export class PoliciesGuard implements CanActivate {
  // private readonly logger = new Logger(PoliciesGuard.name);

  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const path = request.route.path;
    const resource = path.split('/')[2];
    // const resource = this.extractResourceFromPath(request.route?.path);

    const action = this.getActionFromRequest(request);

    // Create ability for user
    const ability = await this.caslAbilityFactory.createForUser(user);

    // Check overall resource access
    if (!ability.can(action, resource)) {
      throw new ForbiddenException(
        `You do not have permission to ${action} ${resource}`,
      );
    }

    // Determine allowed fields
    const allowedFields = this.getAllowedFields(ability, resource, action);

    console.log(allowedFields);
    // Attach allowed fields and resource details to request
    request.allowedFields = allowedFields;
    request.resourceAction = { resource, action };

    // this.logger.log('Permission Check', {
    //   user: user?.sub,
    //   resource,
    //   action,
    //   allowedFields
    // });

    return true;
  }

  private getAllowedFields(ability, resource, action){
    console.log(ability, resource, action);

    return ability.getAllowedFields?.(resource, action) || [];
  }

  private extractResourceFromPath(path: string): string {
    const pathSegments = path?.split('/').filter(Boolean);
    const resource = pathSegments?.[0] || 'unknown';
    return resource.endsWith('s') ? resource.slice(0, -1) : resource;
  }

  private getActionFromRequest(request: Request): Actions {
    const actionMap: Record<string, Actions> = {
      get: Actions.Read,
      post: Actions.Create,
      put: Actions.Update,
      patch: Actions.Update,
      delete: Actions.Delete,
    };

    const method = request.method.toLowerCase();
    return actionMap[method] || Actions.Read;
  }
}
