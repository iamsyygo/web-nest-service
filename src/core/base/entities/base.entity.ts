import { ApiProperty } from '@nestjs/swagger';
import { getDate } from 'src/utils/date';
import { BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn('uuid')
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
}
