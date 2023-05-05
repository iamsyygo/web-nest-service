import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RbacRole } from './role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { getDate } from 'src/utils/date';

@Entity('rbac_user')
export class RbacUser {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({ description: '用户名' })
  @Column({ comment: '用户名' })
  username?: string;

  @ApiProperty({ description: '密码' })
  @Column({ comment: '密码' })
  password?: string;

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

  @ApiProperty({ description: '性别', type: 'enum', enum: [0, 1, 2], default: 2 })
  @Column({
    type: 'enum',
    comment: '性别，0 表示男，1 表示女，2 表示未知',
    enum: [0, 1, 2],
    default: 2,
  })
  gender: [0, 1, 2];

  @ApiProperty({ description: '生日' })
  @Column({ type: 'date', comment: '生日' })
  birthday: Date;

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

  // @ApiProperty({ description: '最后登录时间' })
  // @Column({ type: 'date', comment: '最后登录时间' })
  // lastLoginTime: Date;

  // @ApiProperty({ description: '最后登录 IP' })
  // @Column({ comment: '最后登录 IP' })
  // lastLoginIp: string;

  // @ApiProperty({ description: '注册时间' })
  @Column({ type: 'date', comment: '注册时间', nullable: true })
  registerTime: string;
  @BeforeInsert()
  createDate() {
    this.registerTime = getDate();
  }

  // @ApiProperty({ description: '注册 IP' })
  // @Column({ comment: '注册 IP' })
  // registerIp: string;

  // @ApiProperty({ description: '更新时间' })
  // @UpdateDateColumn({ type: 'date', comment: '更新时间' })
  @Column({ type: 'date', comment: '更新时间', nullable: true })
  updateTime: string;
  @BeforeUpdate()
  updateDate() {
    this.updateTime = getDate();
  }

  // 外键关联，角色字段，一个用户对应多个角色
  @ManyToMany(() => RbacRole, (b) => b.users, {
    cascade: true, // 级联操作
    eager: true, // 自动关联查询
    createForeignKeyConstraints: false, // 不创建外键约束
    // deferrable: 'INITIALLY IMMEDIATE', // 立即检查外键约束
    // lazy: false, // 不使用懒加载
    // persistence: false, // 不持久化
  })
  @JoinTable({ name: 'rbac_user_role' })
  roles: RbacRole[];
}
