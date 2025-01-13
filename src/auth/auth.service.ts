import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {RegisterDto} from './dto/auth.dto';

import { AppUtilities } from 'src/app.utilities';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  private jwtExpires: number;
  private jwtSecret: string;
  private refreshTokenExpires: number;
  private refreshTokenSecret: string;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaClient,
  ) {
    this.jwtExpires = this.configService.get('jwt.expiresIn');
    this.jwtSecret = this.configService.get('jwt.secret');
    this.refreshTokenExpires = this.configService.get('jwt.refreshExpiresIn');
    this.refreshTokenSecret = this.configService.get('jwt.refreshSecret');
  }

  async signToken(
    userId: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = {
      sub: userId,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.jwtExpires,
        secret: this.jwtSecret,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.refreshTokenExpires,
        secret: this.refreshTokenSecret,
      }),
    ]);

 
    return {
      access_token,
      refresh_token,
    };
  }

  async registerUser(dto: RegisterDto) {
    const user = await this.userService.createUser({ email: dto.email });

    if (!user) {
      throw new ConflictException("USER_CONFLICT");
    }


    
  }

  

  async login(dto: RegisterDto) {
    try {
      const user = await this.userService.findUserByEmail(dto.email);
     

      const isMatch = await AppUtilities.validatePassword(
        dto.password,
        user.password,
      );

      if (!isMatch) throw new UnauthorizedException("INCORRECT_CREDS");

      return this.signToken(user.id);
    } catch (error) {
      if (error.code == 'P2025') throw new ForbiddenException("INCORRECT_CREDS");
      throw error;
    }
  }


}
