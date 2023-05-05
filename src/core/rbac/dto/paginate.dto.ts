// import { PaginateOptions } from 'src/utils/paginate';
import { ApiProperty, IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { PaginateOptions } from 'src/utils/paginate';
import { RbacUser } from '../entities/user.entity';
import { RbacRole } from '../entities/role.entity';

export class PaginateUserDto extends IntersectionType(
  // all 非必填，剔除 pushTime 字段
  PartialType(OmitType(RbacUser, [])),
  PaginateOptions,
) {}
export class PaginateRoleDto extends IntersectionType(
  // all 非必填，剔除 pushTime 字段
  PartialType(OmitType(RbacRole, [])),
  PaginateOptions,
) {}
