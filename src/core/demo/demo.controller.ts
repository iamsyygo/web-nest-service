import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DemoService } from './demo.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseQueryDto } from '../_base/dto/query.base.dto';
import { QueryDemoDto } from './dto/query-demo.dto';

@ApiTags('测试')
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @ApiOperation({ summary: '测试创建' })
  @Post()
  create(@Body() createDemoDto: CreateDemoDto) {
    return this.demoService.create(createDemoDto);
  }

  @ApiOperation({ summary: '测试查询' })
  @Get()
  async findAll(@Query() dto: QueryDemoDto) {
    return await this.demoService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
    return this.demoService.update(+id, updateDemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoService.remove(+id);
  }
}
