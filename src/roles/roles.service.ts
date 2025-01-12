import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  // Define your methods here
  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: number) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.role.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.role.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
