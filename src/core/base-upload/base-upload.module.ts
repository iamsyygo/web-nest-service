import { Module } from '@nestjs/common';
import { BaseUploadService } from './base-upload.service';
import { BaseUploadController } from './base-upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileBase } from './entities/file.entity';
import { MulterModule } from 'src/config';

@Module({
  imports: [TypeOrmModule.forFeature([FileBase]), MulterModule],
  controllers: [BaseUploadController],
  providers: [BaseUploadService],
})
export class BaseUploadModule {}
