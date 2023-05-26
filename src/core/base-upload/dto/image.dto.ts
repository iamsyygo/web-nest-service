import { ApiProperty, IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { FileBase } from '../entities/file.entity';
import { PaginateOptions } from 'src/utils/paginate';
export class ImageDto {
  @ApiProperty({ description: '图片文件', type: 'string', format: 'binary' })
  file: any;
}
export class ImagesDto {
  @ApiProperty({
    description: '多图片文件',
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  files: any[];
}

export class PaginateImageDto extends IntersectionType(
  // all 非必填，剔除 id 字段
  PartialType(OmitType(FileBase, ['id'])),
  PaginateOptions,
) {
  @ApiProperty({ description: '图片名称', type: 'string', required: false })
  realFilename: string;

  @ApiProperty({ description: '图片大小', type: 'number', required: false })
  fileSize: number;

  @ApiProperty({ description: '创建时间', type: 'string', required: false })
  createTime: string;
}
