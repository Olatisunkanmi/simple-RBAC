import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { JwtPayload } from 'src/common/interfaces';
import { IS_PUBLIC_KEY } from 'src/common/decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
    private prisma: PrismaClient,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      let payload: any = await this.verifyAccessToken(token);

      if (!payload) throw new UnauthorizedException();

      if (payload.token_type === "AUTH") {
        payload = await this.verifyJwtToken(token);
      }

      request['user'] = payload;
    } catch (err) {
      console.log(err);

      throw new UnauthorizedException();
    }
    return true;
  }

  private async verifyAccessToken(token: string) {
    return await this.prisma.accessToken.findFirst({
      where: {
        token,
      },
    });
  }

  private async verifyJwtToken(token: string) {
    const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('jwt.secret'),
    });

    return payload;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
