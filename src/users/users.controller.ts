import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { PoliciesGuard } from 'src/ability/policies/policies.guard';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@ApiBearerAuth()
@Controller('User')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private prisma: PrismaClient,
  ) {}

  @Get()
  findAll(@Req() req) {
    const { allowedFields } = req;

    const select = allowedFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});

    return this.prisma.user.findMany({
      select: select
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.usersService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
