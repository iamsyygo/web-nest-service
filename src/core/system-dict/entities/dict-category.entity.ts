import { getDate } from 'src/utils/date';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('dict_category')
export class DictCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '分类名称' })
  name: string;

  // 唯一校验
  @Column({ comment: '分类编码', unique: true })
  code: string;

  @Column({ comment: '分类层级', default: 1 })
  level: number;

  @Column({ comment: '分类所属分类', nullable: true, type: 'varchar' })
  parentId: string;

  @ManyToOne(() => DictCategory, (DictCategory) => DictCategory.children, {
    onDelete: 'CASCADE', // 级联删除
    createForeignKeyConstraints: true, // 取消外键约束
  })
  parent: DictCategory;

  @OneToMany(() => DictCategory, (DictCategory) => DictCategory.parent)
  children: DictCategory[];

  @Column({ comment: '分类描述', nullable: true })
  description: string;

  @Column({ comment: '排序', nullable: true })
  sort: number;

  @Column({ comment: '状态：1启用、0禁用', default: 1 })
  status: number;

  @Column({ comment: '创建时间' })
  createTime: string;

  @BeforeInsert()
  handleCreateTime() {
    this.createTime = getDate();
  }

  @Column({ comment: '更新时间', nullable: true })
  updateTime: string;

  @BeforeUpdate()
  handleUpdateTime() {
    this.updateTime = getDate();
  }

  @Column({ comment: '删除时间', nullable: true })
  deleteTime: string;

  @Column({ comment: '删除标记：1已删除、0未删除', nullable: true })
  deleteFlag: number;

  @Column({ comment: '创建人', nullable: true })
  createBy: string;
}
