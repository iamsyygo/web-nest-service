import { SetMetadata } from '@nestjs/common';
import { Roles as _Roles } from '../enum/roles.enum';

export const ROLES_KEY = 'roles';

// 装饰器 Roles SetMetadata 将装饰器的值缓存到元数据中
export const Roles = (...roles: _Roles[]) => SetMetadata(ROLES_KEY, roles);
