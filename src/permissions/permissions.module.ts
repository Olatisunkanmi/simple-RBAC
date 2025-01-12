import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permisssions.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
