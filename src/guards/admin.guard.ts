import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  PERMISSION_CHECKER_KEY,
  RequiredPermission,
} from 'src/common/decorators/role.decorator';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
class AdminGuard implements CanActivate {
  constructor(
    private readonly rolesService: RolesService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission =
      this.reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler(),
      ) || [];

    if (!requiredPermission.length) return true;
    const { user } = context.switchToHttp().getRequest();
  }
}

export default AdminGuard;
