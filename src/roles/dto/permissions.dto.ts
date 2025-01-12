import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Actions, RESOURCES } from 'src/common';

export class PermissionDto {
  @ApiProperty({ description: 'The resource name for the permission.' })
  @IsEnum(RESOURCES, { each: true })
  resource: RESOURCES[];

  @ApiProperty({
    description: 'The actions allowed for the resource.',
  })
  @IsEnum(Actions, { each: true })
  actions: Actions[];

  @ApiPropertyOptional({
    description: 'Conditions for the permission, if any.',
    type: Object,
  })
  @IsOptional()
  conditions?: object;
}
