import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBase64,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SortDirection } from '../../interfaces';

export class PaginationOptionsDto {
  @ApiPropertyOptional({
    description: 'Base64 encoded cursor for pagination.',
    type: String,
  })
  @IsBase64()
  @IsOptional()
  cursor?: string;

  @ApiPropertyOptional({
    description: 'Number of items per page.',
    type: Number,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsInt()
  @IsOptional()
  @Max(100)
  @Min(1)
  @Type(() => Number)
  size?: number;

  @ApiPropertyOptional({
    description: 'Field to order results by.',
    type: String,
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Sort direction for results.',
    enum: SortDirection,
    default: SortDirection.DESC,
  })
  @IsEnum(SortDirection)
  @IsOptional()
  direction?: SortDirection = SortDirection.DESC;

  @ApiPropertyOptional({
    description: 'Pagination type (cursor or page).',
    type: String,
    default: 'cursor',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  paginationType?: string = 'cursor';

  @ApiPropertyOptional({
    description: 'Page number for pagination (only for page-based pagination).',
    type: Number,
    minimum: 1,
    maximum: 100,
    default: 1,
  })
  @IsInt()
  @IsOptional()
  @Max(100)
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Indicates if pagination is enabled.',
    type: String,
    default: 'true',
  })
  @IsString()
  @IsOptional()
  isPaginated?: string = 'true';

  @ApiPropertyOptional({
    description: 'Access token for authentication (if required).',
    type: String,
  })
  @IsString()
  @IsOptional()
  access_token?: string;
}

export class PaginationSearchOptionsDto extends PaginationOptionsDto {
  @ApiPropertyOptional({
    description: 'Access token for authentication (if required).',
    type: String,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  term?: string;
}
