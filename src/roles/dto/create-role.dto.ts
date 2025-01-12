import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PermissionDto } from './permissions.dto';

export class CreateRoleDto {
  @ApiProperty({ example: 'superAdmin' })
  @ApiProperty({ description: 'The name of the role.' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'The description of the role.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The permissions associated with the role.',
    isArray: true,
    type: PermissionDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionDto)
  permissions: PermissionDto[];
}

export class UpdateRoleDto {
  @ApiProperty({ example: 'superAdmin' })
  @ApiProperty({ description: 'The name of the role.' })
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'The description of the role.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The permissions associated with the role.',
    isArray: true,
    type: PermissionDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionDto)
  permissions?: PermissionDto[];
}
