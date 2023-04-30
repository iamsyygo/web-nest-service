// import { PaginateOptions } from 'src/utils/paginate';
import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { CodeRemove } from 'src/core/index.entity';
import { PaginateOptions } from 'src/utils/paginate';

export class PaginateDto extends IntersectionType(PartialType(CodeRemove), PaginateOptions) {
  @ApiProperty({ description: '提交时间', required: false })
  pushTime?: string;
}

// PickType(PersonDTO,['name','hintText'])
// OmitType(PersonDTO,['name','hintText'])
