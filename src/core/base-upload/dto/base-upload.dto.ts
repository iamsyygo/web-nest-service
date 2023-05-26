import { ApiProperty } from '@nestjs/swagger';

export class BaseUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
