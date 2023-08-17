import { Column, PrimaryGeneratedColumn } from 'typeorm';

export enum DeleteFlag {
  FALSE = 0,
  TRUE = 1,
}

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
    update: false,
  })
  createTime: Date;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '创建人', update: false })
  createBy: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '修改时间',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '更新人' })
  updateBy: string;

  @Column({ type: 'timestamp', nullable: true, comment: '删除时间' })
  deleteTime: Date;

  @Column({ type: 'varchar', length: 50, nullable: true, comment: '删除人' })
  deleteBy: string;

  @Column({ type: 'enum', enum: DeleteFlag, default: DeleteFlag.FALSE, comment: '删除标识' })
  deleteFlag: number;
}
