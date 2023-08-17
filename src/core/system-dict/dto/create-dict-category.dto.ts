import { ApiProperty } from '@nestjs/swagger';

export class CreateDictCategoryDto {
  @ApiProperty({ description: '分类名称' })
  name?: string;

  // class-validator 验证唯一
  @ApiProperty({ description: '分类编码', uniqueItems: true })
  code?: string;

  @ApiProperty({ description: '分类父级', required: false })
  parentId?: string;

  @ApiProperty({ description: '状态：1启用、0禁用', required: false, default: 1 })
  status?: number;

  @ApiProperty({ description: '字典描述', required: false })
  description?: string;

  @ApiProperty({ description: '排序', required: false })
  sort?: number;

  [key: string]: any;
}
