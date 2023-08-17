import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SystemMenuService } from './system-menu.service';
import { CreateSystemMenuDto } from './dto/create-system-menu.dto';
import { UpdateSystemMenuDto } from './dto/update-system-menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@ApiTags('系统菜单')
@Controller('system-menu')
export class SystemMenuController {
  constructor(private readonly systemMenuService: SystemMenuService) {}

  @ApiOperation({ summary: '创建系统菜单' })
  @Post('create-menu')
  createMenu(@Body() createSystemMenuDto: CreateSystemMenuDto) {
    return this.systemMenuService.createMenu(createSystemMenuDto);
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取系统菜单树' })
  @Get('menu-tree')
  findAll() {
    return this.systemMenuService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取系统简单菜单树' })
  @Get('menu-simple-tree')
  findAllSimpleTree() {
    return this.systemMenuService.findAllSimpleTree();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '更新系统菜单' })
  @Post('update-menu')
  update(@Body() updateSystemMenuDto: UpdateSystemMenuDto) {
    return this.systemMenuService.update(updateSystemMenuDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '删除系统菜单' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemMenuService.remove(+id);
  }
}
