import { ApiProperty } from '@nestjs/swagger';

export class BaseDeleteDto {
  @ApiProperty({ description: '主键 id 列表' })
  ids: string[];
}
