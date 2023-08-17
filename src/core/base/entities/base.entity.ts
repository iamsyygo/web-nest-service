import { ApiProperty } from '@nestjs/swagger';
import { getDate } from 'src/utils/date';
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: '创建时间' })
  @Column({ comment: '创建时间', nullable: true })
  createTime: string;
  @BeforeInsert()
  createDate() {
    this.createTime = getDate();
  }

  @ApiProperty({ description: '更新时间' })
  @Column({ type: 'date', comment: '更新时间', nullable: true })
  updateTime: string;
  @BeforeUpdate()
  updateDate() {
    this.updateTime = getDate();
  }

  @Column({ comment: '删除时间', nullable: true })
  deleteTime: string;
  @BeforeRemove()
  deleteDate() {
    this.deleteTime = getDate();
  }

  @Column({ comment: '删除标记：1已删除、0未删除', nullable: true })
  deleteFlag: number;
  @BeforeRemove()
  deleteFlagDate() {
    this.deleteFlag = 1;
  }

  @Column({ comment: '创建人', nullable: true })
  createBy: string;
  // @CreateDateColumn()
}
