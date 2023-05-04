import { ApiProperty } from '@nestjs/swagger';
import { getDate } from 'src/utils/date';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class CodeRemove {
  @ApiProperty({ description: '主键' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({ description: '源包名' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '源包名',
  })
  sourcePackage?: string;

  @ApiProperty({ description: '目标包名' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '目标包名',
  })
  targetPackage?: string;

  @ApiProperty({ description: '源IP' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '源IP',
  })
  sourceIp?: string;

  @ApiProperty({ description: '目标IP' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '目标IP',
  })
  targetIp: string;

  @ApiProperty({ description: '提交时间' })
  @Column({
    type: 'date', // e.g. 2018-11-13
    comment: '提交时间',
    // default: () => 'CURRENT_TIMESTAMP',
  })
  pushTime?: string;

  @ApiProperty({ description: '提交人' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '提交人',
  })
  pushUser: string;

  @ApiProperty({ description: '真实地址' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '真实地址',
  })
  realAddress: string;
}
