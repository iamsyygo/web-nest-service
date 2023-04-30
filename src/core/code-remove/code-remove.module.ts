import { Module } from '@nestjs/common';
import { CodeRemoveService } from './code-remove.service';
import { CodeRemoveController } from './code-remove.controller';
import { CodeRemove } from '../index.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CodeRemove])],
  controllers: [CodeRemoveController],
  providers: [CodeRemoveService],
})
export class CodeRemoveModule {}
