import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesService } from './roles.service';

@Module({
  imports: [PermissionsModule],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
