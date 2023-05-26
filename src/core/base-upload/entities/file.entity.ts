import { Exclude } from 'class-transformer';
import { getDate } from 'src/utils/date';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files_upload')
export class FileBase {
  @PrimaryGeneratedColumn('uuid', {
    comment: '主键',
  })
  id: string;

  @Column({ comment: '原始文件名' })
  realFilename: string;

  @Column({ comment: '重命名后的文件名' })
  newFilename: string;

  @Column({ comment: '文件类型' })
  fileType: string;

  @Column({ comment: '文件大小' })
  fileSize: number;

  @Column({ comment: '文件路径' })
  filePath: string;

  @Column({
    type: 'enum',
    comment: '是否启用，0 表示正常，1 表示禁用，2 表示删除',
    enum: [0, 1, 2],
    default: 0,
  })
  // @Exclude()
  state: [0, 1, 2];

  @Column({ comment: '创建时间', nullable: true })
  createTime: string;

  @BeforeInsert()
  createDate() {
    this.createTime = getDate('YYYY-MM-DD HH:mm:ss');
  }

  @Column({ comment: '更新时间', nullable: true })
  updateTime?: string;

  @BeforeUpdate()
  updateDate() {
    this.updateTime = getDate('YYYY-MM-DD HH:mm:ss');
  }
}
