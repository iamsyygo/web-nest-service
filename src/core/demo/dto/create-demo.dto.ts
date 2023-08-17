import { ApiProperty } from '@nestjs/swagger';

export class CreateDemoDto {
  @ApiProperty({ description: '名称' })
  name: string;

  @ApiProperty({ description: '年龄' })
  age: number;
}
