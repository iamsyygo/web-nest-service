import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SystemDictService } from './system-dict.service';
import { CreateSystemDictDto } from './dto/create-system-dict.dto';
import { UpdateSystemDictDto } from './dto/update-system-dict.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryDictCategory } from './dto/query-dict-category.dto';
import { CreateDictCategoryDto } from './dto/create-dict-category.dto';
import { QuerySystemDict } from './dto/query-system-dict.dto';

@ApiTags('字典管理')
@Controller('system-dict')
export class SystemDictController {
  constructor(private readonly systemDictService: SystemDictService) {}

  @ApiOperation({ summary: '获取分类树' })
  @Get('/getDictCategoryTree')
  getDictCategoryTree() {
    return this.systemDictService.getDictCategoryTree();
  }

  @ApiOperation({ summary: '获取分类列表' })
  @Get('/queryDictList')
  queryDictList(@Query() query: QueryDictCategory) {
    return this.systemDictService.queryDictList(query);
  }

  // 创建字典分类
  @ApiOperation({ summary: '创建字典管理分类' })
  @Post('/createDictCategory')
  async createDictCategory(@Body() dto: CreateDictCategoryDto) {
    return await this.systemDictService.createDictCategory(dto);
  }

  // 创建字典
  @ApiOperation({ summary: '创建字典' })
  @Post('/createDict')
  async createDict(@Body() dto: CreateSystemDictDto) {
    return await this.systemDictService.createDict(dto);
  }

  // 更新字典
  // @ApiOperation({ summary: '更新字典' })
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSystemDictDto: UpdateSystemDictDto) {
  //   return this.systemDictService.update(+id, updateSystemDictDto);
  // }

  // 删除字典
  // @ApiOperation({ summary: '删除字典' })
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.systemDictService.remove(+id);
  // }

  // 获取字典列表

  @ApiOperation({ summary: '获取字典列表' })
  @Get('/getDictList')
  getDictList(@Query() query: QuerySystemDict) {
    return this.systemDictService.getDictList(query);
  }
}
