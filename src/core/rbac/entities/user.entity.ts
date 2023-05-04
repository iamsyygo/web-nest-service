import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { RbacRole } from './role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('rbac_user')
export class RbacUser {
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({ description: '用户名' })
  @Column({ comment: '用户名' })
  username: string;

  @ApiProperty({ description: '密码' })
  @Column({ comment: '密码' })
  password: string;

  @ApiProperty({ description: '头像' })
  @Column({ comment: '头像' })
  avatar: string;

  @ApiProperty({ description: '邮箱' })
  @Column({ comment: '邮箱', unique: true })
  email: string;

  @ApiProperty({ description: '手机号' })
  @Column({ comment: '手机号', unique: true })
  phoneNumber: string;

  @ApiProperty({ description: '真实姓名' })
  @Column({ comment: '真实姓名' })
  fullName: string;

  @ApiProperty({ description: '昵称' })
  @Column({
    type: 'enum',
    comment: '性别，0 表示男，1 表示女，2 表示未知',
    enum: [0, 1, 2],
    default: 2,
  })
  gender: [0, 1, 2];

  @ApiProperty({ description: '生日' })
  @Column({ type: 'date', comment: '生日' })
  birthday: string;

  @ApiProperty({ description: '国家' })
  @Column({ comment: '省份' })
  province: string;

  @ApiProperty({ description: '城市' })
  @Column({ comment: '城市' })
  city: string;

  @ApiProperty({ description: '区县' })
  @Column({ comment: '详细地址' })
  address: string;

  @Column({
    type: 'enum',
    comment: '是否启用，0 表示正常，1 表示禁用，2 表示删除',
    enum: [0, 1, 2],
    default: 0,
  })
  state: [0, 1, 2];

  @Column({ type: 'date', comment: '最后登录时间' })
  lastLoginTime: string;

  @Column({ comment: '最后登录 IP' })
  lastLoginIp: string;

  @Column({ type: 'date', comment: '注册时间' })
  registerTime: string;

  @Column({ comment: '注册 IP' })
  registerIp: string;

  @Column({ type: 'date', comment: '更新时间' })
  updateTime: string;

  // 外键关联，角色字段，一个用户对应多个角色
  @OneToMany(() => RbacRole, (b) => b.users)
  @JoinColumn()
  roles: RbacRole[];
}
