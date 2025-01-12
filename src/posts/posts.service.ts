import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // Define your methods here
  async findAll() {
    return this.prisma.post.findMany();
  }

  async findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.post.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.post.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
