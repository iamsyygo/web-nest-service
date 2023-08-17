import { ApiProperty, IntersectionType } from '@nestjs/swagger';

class QueryDto {
  @ApiProperty({ description: '页码', default: 1, required: false })
  page!: number;

  @ApiProperty({ description: '页数', default: 10, required: false })
  pageSize!: number;

  @ApiProperty({ description: '排序: key1:asc,key2:desc', required: false })
  sort!: string;
}

export const BaseQueryDto = IntersectionType(QueryDto);
