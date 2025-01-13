import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'superAdmin' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'superAdmin' })
  @IsString()
  password: string;
}

export class LoginDto extends RegisterDto {}
