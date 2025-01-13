import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { PermissionsService } from './permission.service';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, PermissionsService],
  exports: [RolesService],
})
export class RolesModule {}
