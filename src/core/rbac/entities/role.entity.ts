import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RbacUser } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('rbac_role')
export class RbacRole {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({ description: '角色名称' })
  @Column({ comment: '角色名称' })
  name: string;

  @ApiProperty({ description: '角色描述' })
  @Column({ comment: '角色描述' })
  description: string;

  @ApiProperty({ description: '是否启用', enum: [0, 1, 2] })
  @Column({
    type: 'enum',
    comment: '是否启用，0 表示正常，1 表示禁用，2 表示删除',
    enum: [0, 1, 2],
    default: 0,
  })
  state: [0, 1, 2];

  @ApiProperty({ description: '创建时间' })
  @Column({ comment: '创建时间' })
  createTime: string;

  @ApiProperty({ description: '更新时间' })
  @Column({ comment: '更新时间' })
  updateTime: string;

  @ApiProperty({ description: '是否为超级管理员' })
  @Column({ comment: '是否为超级管理员' })
  isSuper: boolean;

  @ApiProperty({ description: '排序' })
  @Column({ comment: '排序' })
  order: number;

  @ApiProperty({ description: '父级角色 id' })
  @Column({ comment: '父级角色 id' })
  parent_id: string;

  // 关联用户
  @ApiProperty({ description: '关联user_id' })
  @ManyToMany(() => RbacUser, (user) => user.roles, {})
  // @JoinColumn({ name: 'user_id' })
  users: RbacUser[];
}
