import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto/create-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesService } from './roles.service';
import { PoliciesGuard } from 'src/ability/policies/policies.guard';
import { CheckPolicies } from 'src/ability/decorator/check-policies.decorator';
import { AppAbility } from 'src/ability/ability.types';
import { Actions, RESOURCES } from 'src/common';
import { PrismaClient } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private prisma: PrismaClient,
  ) {}

  // @Put('/:roleId')
  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Actions.Update, RESOURCES.roles),
  // )
  // updateRole(@Param('roleId') roleId: string, @Body() dto: UpdateRoleDto) {
  //   return this.rolesService.updateRole(roleId, dto);
  // }

  // @Post('/create')
  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Actions.Create, RESOURCES.roles),
  // )
  // createRole(@Body() dto: CreateRoleDto) {
  //   return this.rolesService.createRole(dto);
  // }

  @Put('/:roleId/users/:userId')
  assignToUser(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.prisma.userRole.create({
      data: {
        roleId,
        userId,
      },
    });
  }

  @Get('')
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Actions.Read, RESOURCES.roles),
  )
  async fetchAllRoles() {
    return await this.prisma.role.findMany({
      include: {
        users: true,
        permissions: {
          select: {
            fields: true,
          },
        },
      },
    });
  }

  // @Get('/:roleId')
  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Actions.Read, RESOURCES.roles),
  // )
  // findRolebyId(@Param('roleId') roleId: string) {
  //   return this.rolesService.getById(roleId);
  // }
}
