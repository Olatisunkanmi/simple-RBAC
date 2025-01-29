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

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const request = context.switchToHttp().getRequest();

    const path = request.route.path;
    console.log({
      path: request.route.path,
      method: request.method,
      fullUrl: request.originalUrl,
      baseUrl: request.baseUrl,
      params: request.params,
      query: request.query,
    });

    const resource = path.split('/')[1]

    const ability = await this.caslAbilityFactory.createForUser(user);

    // const resource = this.getResourceFromRequest(request);
    const action = this.getActionFromRequest(request);

    if (!ability.can(action, resource)) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private getActionFromRequest(request: Request): string {
    // Map HTTP methods to CASL actions
    switch (request.method.toLowerCase()) {
      case 'get':
        return Actions.Read;
      case 'post':
        return Actions.Create;
      case 'put':
      case 'patch':
        return Actions.Update;
      case 'delete':
        return Actions.Delete;
      default:
        return Actions.Read;
    }
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
