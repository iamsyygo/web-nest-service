import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync } from 'bcryptjs';

import { RbacRole } from './role.entity';
import { getDate } from 'src/utils/date';
// import { Exclude } from 'class-transformer';

@Entity('rbac_user')
export class RbacUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '用户名' })
  username: string;

  @Column({ comment: '微信 openid', nullable: true })
  openid: string;

  @Column({ comment: '密码' /* select: false  */, nullable: true })
  // @Exclude()
  password: string;

  @BeforeInsert()
  async encryptPassword() {
    // 微信登录时不需要密码
    if (!this.password) return;
    this.password = await hashSync(this.password, 10);
  }

  @Column({ comment: '头像', nullable: true })
  avatar: string;

  @Column({ comment: '邮箱', unique: true, nullable: true })
  email: string;

  @Column({ comment: '手机号', unique: true, nullable: true })
  phoneNumber: string;

  @Column({ comment: '真实姓名', nullable: true })
  fullName: string;

  @Column({
    type: 'enum',
    comment: '性别，0 表示男，1 表示女，2 表示未知',
    enum: [0, 1, 2],
    default: 2,
    nullable: true,
  })
  gender: 0 | 1 | 2;

  @Column({ type: 'date', comment: '生日', nullable: true })
  birthday: Date;

  @Column({ comment: '省份', nullable: true })
  province: string;

  @Column({ comment: '城市', nullable: true })
  city: string;

  @Column({ comment: '详细地址', nullable: true })
  address: string;

  @Column({
    type: 'enum',
    comment: '是否启用，0 表示正常，1 表示禁用，2 表示删除',
    enum: [0, 1, 2],
    default: 0,
    nullable: true,
  })
  state: number;

  // @Column({ type: 'date', comment: '最后登录时间' })
  // lastLoginTime: Date;

  // @Column({ comment: '最后登录 IP' })
  // lastLoginIp: string;

  // @ApiProperty({ description: '注册时间' })
  @Column({ type: 'date', comment: '注册时间', nullable: true })
  registerTime: string;

  @BeforeInsert()
  createDate() {
    this.registerTime = getDate('YYYY-MM-DD HH:mm:ss');
  }

  // @Column({ comment: '注册 IP' })
  // registerIp: string;

  @Column({ type: 'date', comment: '更新时间', nullable: true })
  updateTime: string;
  @BeforeUpdate()
  updateDate() {
    this.updateTime = getDate('YYYY-MM-DD HH:mm:ss');
  }

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

  @Column({ comment: '微信 session_key', nullable: true })
  sessionKey?: string;
}
