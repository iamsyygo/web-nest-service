import { OmitType } from '@nestjs/swagger';
import { RbacUser } from '../entities/user.entity';

export class CreateRbacUserDto extends OmitType(RbacUser, [
  'id',
  // 'registerTime',
  'updateTime',
  // 'lastLoginTime',
  // 'lastLoginIp',
  // 'registerIp',
]) {
  //   registerTime: string;
  //   updateTime: string;
  //   lastLoginTime: string;
  //   lastLoginIp: string;
  //   registerIp: string;
}
