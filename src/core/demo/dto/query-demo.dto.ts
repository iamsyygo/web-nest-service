import { BaseQueryDto } from '@/core/_base/dto/query.base.dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';

export class QueryDemoDto extends BaseQueryDto {
  @ApiProperty({ description: '名称', required: false })
  name: string;

  @ApiProperty({ description: '创建时间', required: false })
  createTime: string;

  @ApiProperty({ description: '更新时间', required: false })
  updateTime: string;
}
