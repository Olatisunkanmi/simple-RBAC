import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  // Define your methods here
  async findAll() {
    return this.prisma.permission.findMany();
  }

  async findOne(id: string) {
    return this.prisma.permission.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.permission.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.permission.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.permission.delete({ where: { id } });
  }
}
