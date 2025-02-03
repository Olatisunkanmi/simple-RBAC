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
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const path = request.route.path;
    const resource = path.split('/')[2];

    const action = this.getActionFromRequest(request);

    const ability = await this.caslAbilityFactory.createForUser(user);

    if (!ability.can(action, resource)) {
      throw new ForbiddenException(
        `You do not have permission to ${action} ${resource}`,
      );
    }

    const allowedFields = this.getAllowedFields(ability, resource, action);

    request.allowedFields = allowedFields;
    request.resourceAction = { resource, action };

    return true;
  }

  private getAllowedFields(ability, resource, action) {
    const allFields = ability.M?.filter(
      (rule) =>
        rule.subject.toLowerCase() === resource.toLowerCase() &&
        rule.action === action,
    ).flatMap((rule) => rule.fields || []);

    return allFields || [];
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
