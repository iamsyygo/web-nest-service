import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsMobilePhone } from 'class-validator';

export class CreateRbacUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @MinLength(6, { message: '用户名长度不能小于 6 位' })
  @MaxLength(20, { message: '用户名长度不能大于 20 位' })
  @ApiProperty({ description: '用户名' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码长度不能小于 8 位' })
  @MaxLength(20, { message: '密码长度不能大于 20 位' })
  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '头像', required: false })
  avatar: string;

  @ApiProperty({ description: '邮箱', uniqueItems: true })
  @IsEmail({}, { message: '邮箱格式错误' })
  email: string;

  @IsMobilePhone('zh-CN', {}, { message: '手机号码格式错误' })
  @ApiProperty({ description: '手机号', required: false })
  phoneNumber: string;

  @ApiProperty({ description: '真实姓名', required: false })
  fullName: string;

  @ApiProperty({ description: '性别, 0 表示男，1 表示女，2 表示未知', required: false })
  gender: 0 | 1 | 2;

  @ApiProperty({ description: '生日', required: false })
  birthday: Date;

  @ApiProperty({ description: '国家', required: false })
  province: string;

  @ApiProperty({ description: '城市', required: false })
  city: string;

  @ApiProperty({ description: '区县', required: false })
  address: string;

  @ApiProperty({ description: '是否启用，0 表示正常，1 表示禁用，2 表示删除', required: false })
  state: 0 | 1 | 2;

  // @ApiProperty({ description: '最后登录时间' })
  // @Column({ type: 'date', comment: '最后登录时间' })
  // lastLoginTime: Date;

  // @ApiProperty({ description: '最后登录 IP' })
  // @Column({ comment: '最后登录 IP' })
  // lastLoginIp: string;

  // @ApiProperty({ description: '注册 IP' })
  // @Column({ comment: '注册 IP' })
  // registerIp: string;

  // @ApiProperty({ description: '更新时间' })
  // @UpdateDateColumn({ type: 'date', comment: '更新时间' })
}
