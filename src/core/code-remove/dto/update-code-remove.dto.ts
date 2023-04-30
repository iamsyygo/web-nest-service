import { PartialType } from '@nestjs/mapped-types';
import { CreateCodeRemoveDto } from './create-code-remove.dto';

export class UpdateCodeRemoveDto extends PartialType(CreateCodeRemoveDto) {}
