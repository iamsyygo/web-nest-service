import { Module } from '@nestjs/common';
import { SystemDictService } from './system-dict.service';
import { SystemDictController } from './system-dict.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemDict } from './entities/system-dict.entity';
import { DictCategory } from './entities/dict-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemDict, DictCategory])],
  controllers: [SystemDictController],
  providers: [SystemDictService],
})
export class SystemDictModule {}
