import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { RbacUser } from '../entities/user.entity';

export class AuthUser {
  //   @ApiProperty({ description: '验证码' })
  //   code: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码长度不能小于 8 位' })
  @MaxLength(20, { message: '密码长度不能大于 20 位' })
  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '邮箱', required: false })
  email?: string;

  @IsMobilePhone('zh-CN', {}, { message: '手机号码格式错误' })
  @ApiProperty({ description: '手机号' })
  phoneNumber: string;
}

export class TokenData {
  sub: string;
  username: string;
  email?: string;
  phoneNumber?: string;
  openid?: string;
  sessionKey?: string;
}

export class WxinDto {
  @ApiProperty({ description: '微信用户id', required: false })
  id?: string;

  @ApiProperty({ description: '微信code' })
  code: string;

  @ApiProperty({ description: '微信用户头像' })
  avatar: string;

  @ApiProperty({ description: '微信用户昵称' })
  username: string;
}
