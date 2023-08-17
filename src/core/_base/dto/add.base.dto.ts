import { ApiProperty } from '@nestjs/swagger';

export class BaseAddDto {
  @ApiProperty({ description: '主键' })
  id: string;

  @ApiProperty({ description: '创建人' })
  createBy: string;

  @ApiProperty({ description: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '更新人' })
  updateBy: string;

  @ApiProperty({ description: '更新时间' })
  updateTime: Date;

  @ApiProperty({ description: '删除人' })
  deleteBy: string;

  @ApiProperty({ description: '删除时间' })
  deleteTime: Date;

  @ApiProperty({ description: '删除标记：1已删除、0未删除' })
  deleteFlag: number;

  @ApiProperty({ description: '备注' })
  remark: string;

  @ApiProperty({ description: '排序' })
  sort: number;

  @ApiProperty({ description: '状态：1启用、0禁用' })
  status: number;
}
