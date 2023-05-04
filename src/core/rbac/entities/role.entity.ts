import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { RbacUser } from './user.entity';

@Entity('rbac_role')
export class RbacRole {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ comment: '角色名称' })
  name: string;

  @Column({ comment: '角色描述' })
  description: string;

  @Column({
    type: 'enum',
    comment: '是否启用，0 表示正常，1 表示禁用，2 表示删除',
    enum: [0, 1, 2],
    default: 0,
  })
  state: [0, 1, 2];

  @Column({ comment: '创建时间' })
  createTime: string;

  @Column({ comment: '更新时间' })
  updateTime: string;

  @Column({ comment: '是否为超级管理员' })
  isSuper: boolean;

  @Column({ comment: '排序' })
  order: number;

  @Column({ comment: '父级角色 id' })
  parent_id: string;

  // 关联用户
  @OneToMany(() => RbacUser, (b) => b.roles)
  @JoinColumn()
  users: RbacUser[];
}
