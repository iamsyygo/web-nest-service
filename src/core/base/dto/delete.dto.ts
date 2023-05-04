import { ApiProperty } from '@nestjs/swagger';

export class BaseDeleteDto {
  @ApiProperty({ description: '主键 ids' })
  ids: string[];
}
