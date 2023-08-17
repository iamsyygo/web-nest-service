import { ApiProperty } from '@nestjs/swagger';

export class QueryDictCategory {
  @ApiProperty({ description: '分类名称', required: false })
  name?: string;

  @ApiProperty({ description: '分类编码', required: false })
  code?: string;

  @ApiProperty({ description: '状态：1启用、0禁用', required: false })
  status?: number;

  @ApiProperty({ description: '分类层级', required: false })
  level?: string;

  @ApiProperty({ description: '创建时间', required: false })
  createTime?: string;

  @ApiProperty({ description: '当前页', required: false, default: 1 })
  page?: number;

  @ApiProperty({ description: '每页条数', required: false, default: 10 })
  limit?: number;
}
