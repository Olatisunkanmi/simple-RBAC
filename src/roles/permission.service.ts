import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Actions } from 'src/common';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}
}
