import { BaseEntity } from 'src/core/base/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('system_menu')
export class SystemMenu extends BaseEntity {
  @Column({ comment: '菜单名称' })
  name: string;

  @Column({ comment: '菜单编码(路由)' })
  path: string;

  @Column({ comment: '菜单层级', default: 1 })
  level: number;

  @Column({ comment: '菜单所属菜单', nullable: true, type: 'varchar' })
  parentId: string;

  @Column({ comment: '菜单描述', nullable: true })
  description: string;

  @Column({ comment: '排序', nullable: true })
  sort: number;

  @Column({ comment: '状态：1启用、0禁用', default: 1 })
  status: number;

  @Column({ comment: '菜单图标', nullable: true })
  icon: string;

  @Column({ comment: '菜单类型：1菜单、2按钮', default: 1 })
  type: number;

  @Column({ comment: '权限: 1所有权限、2系统权限、3自定义权限', default: 1 })
  permission: string;

  @ManyToOne(() => SystemMenu, (SystemMenu) => SystemMenu.children, {
    onDelete: 'CASCADE', // 级联删除
    createForeignKeyConstraints: true, // 取消外键约束
  })
  parent: SystemMenu;

  @OneToMany(() => SystemMenu, (SystemMenu) => SystemMenu.parent)
  children: SystemMenu[];
}
