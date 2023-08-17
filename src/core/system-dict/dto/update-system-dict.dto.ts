import { PartialType } from '@nestjs/swagger';
import { CreateSystemDictDto } from './create-system-dict.dto';

export class UpdateSystemDictDto extends PartialType(CreateSystemDictDto) {}
