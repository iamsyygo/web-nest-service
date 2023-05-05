import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { CreateRbacUserDto } from './dto/create-rbac.dto';
import { UpdateRbacDto } from './dto/update-rbac.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginateRoleDto, PaginateUserDto } from './dto/paginate.dto';

@ApiTags('rbac')
@Controller('rbac')
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  @ApiOperation({ summary: '用户列表查询' })
  @Get('user/list')
  findUserAll(@Query() query: PaginateUserDto) {
    return this.rbacService.findUserList(query);
  }
  @ApiOperation({ summary: '角色列表查询' })
  @Get('role/list')
  findRoleAll(@Query() query: PaginateRoleDto) {
    return this.rbacService.findRoleList(query);
  }

  @ApiOperation({ summary: '创建用户' })
  @Post('user/create')
  createUser(@Body() createRbacDto: CreateRbacUserDto) {
    return this.rbacService.createUser(createRbacDto);
  }
}
