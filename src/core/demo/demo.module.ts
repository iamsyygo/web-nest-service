import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demo } from './entities/demo.entity';

@Module({
  controllers: [DemoController],
  providers: [DemoService],
  imports: [TypeOrmModule.forFeature([Demo])],
})
export class DemoModule {}
