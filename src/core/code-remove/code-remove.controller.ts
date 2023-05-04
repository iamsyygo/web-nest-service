import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CodeRemoveService } from './code-remove.service';
import { CreateCodeRemoveDto } from './dto/create-code-remove.dto';
import { UpdateCodeRemoveDto } from './dto/update-code-remove.dto';
import { PaginateDto } from './dto/paginate.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { getDate } from 'src/utils/date';
import { BaseDeleteDto } from '../base/dto/delete.dto';

@ApiTags('部署代码相关接口')
@Controller('code-remove')
export class CodeRemoveController {
  constructor(private readonly codeRemoveService: CodeRemoveService) {}

  @ApiOperation({ summary: '部署信息列表' })
  @Get('/getList')
  function(@Query() query: PaginateDto) {
    const { page, limit, pushTime, ...rest } = query;
    return this.codeRemoveService.getList({
      page: Number(page),
      limit: Number(limit),
      fuzzy: rest,
      // dates: { pushTime },
      timeRanges: { pushTime },
    });
  }

  @ApiOperation({ summary: '新增部署信息' })
  @Post('/setCodeRemove')
  create(@Body() createCodeRemoveDto: CreateCodeRemoveDto) {
    createCodeRemoveDto.pushTime = getDate();
    return this.codeRemoveService.setCodeRemove(createCodeRemoveDto);
  }

  @ApiOperation({ summary: '(批量)删除部署信息' })
  @Delete('/deleteCodeRemove')
  remove(@Body() body: BaseDeleteDto) {
    return this.codeRemoveService.deleteCodeRemove(body.ids);
  }
}
