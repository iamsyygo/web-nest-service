import { OmitType } from '@nestjs/swagger';
import { CodeRemove } from '../../index.entity';

export class CreateCodeRemoveDto extends OmitType(CodeRemove, ['id', 'pushTime']) {}
