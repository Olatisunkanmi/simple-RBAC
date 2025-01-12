import { IsEnum, IsString } from 'class-validator';
import { roleTypes } from '@prisma/client';

export class AssignRoleToUser {
  @IsString()
  identity: string;

  @IsEnum(roleTypes)
  role: roleTypes;
}
