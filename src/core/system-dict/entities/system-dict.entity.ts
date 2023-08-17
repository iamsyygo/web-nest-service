import { getDate } from 'src/utils/date';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system_dict')
export class SystemDict {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '字典名称' })
  label: string;

  @Column({ comment: '字典值' })
  value: string;

  @Column({ comment: '字典所属分类编码' })
  type: string;

  @Column({ comment: '字典描述', nullable: true })
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

  @Column({ comment: '删除标记：1已删除、0未删除', default: 0 })
  deleteFlag: number;

  @Column({ comment: '创建人', nullable: true })
  createBy: string;
}
