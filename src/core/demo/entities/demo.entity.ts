import { BaseEntity } from '@/core/_base/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class Demo extends BaseEntity {
  @Column({
    comment: '姓名',
  })
  name: string;

  @Column({
    comment: '年龄',
  })
  age: number;
}
