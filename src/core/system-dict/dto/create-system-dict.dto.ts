import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemDictDto {
  @ApiProperty({ description: '字典名称' })
  label?: string;

  @ApiProperty({ description: '字典编码' })
  value?: string;

  @ApiProperty({ description: '字典所属分类' })
  type?: string;

  @ApiProperty({ description: '状态：1启用、0禁用', required: false, default: 1 })
  status?: number;

  @ApiProperty({ description: '字典描述', required: false })
  description?: string;

  @ApiProperty({ description: '排序', required: false })
  sort?: number;

  [key: string]: any;
}
