import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateRole, IUpdateRole } from './interface/role.interface';
import { PermissionsService } from './permission.service';
import { Prisma } from '@prisma/client';
import { Actions, RESOURCES } from 'src/common';

@Injectable()
export class RolesService {
  constructor(
    private prisma: PrismaService,
    private permissionsService: PermissionsService,
  ) {}
}
