import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSystemMenuDto } from './create-system-menu.dto';

export class UpdateSystemMenuDto extends PartialType(CreateSystemMenuDto) {
  @ApiProperty({ description: '菜单ID' })
  id: number;
}
