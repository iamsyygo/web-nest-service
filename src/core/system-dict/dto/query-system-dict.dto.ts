import { ApiProperty } from '@nestjs/swagger';

export class QuerySystemDict {
  @ApiProperty({ description: '字典名称', required: false })
  name?: string;

  @ApiProperty({ description: '字典编码', required: false })
  code?: string;

  @ApiProperty({ description: '字典类型', required: false })
  type?: string;

  @ApiProperty({ description: '状态：1启用、0禁用', required: false })
  status?: number;

  @ApiProperty({ description: '创建时间', required: false })
  createTime?: string;

  @ApiProperty({ description: '当前页', required: false, default: 1 })
  page?: number;

  @ApiProperty({ description: '每页条数', required: false, default: 10 })
  limit?: number;
}
