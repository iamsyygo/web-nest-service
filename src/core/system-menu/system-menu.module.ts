import { Module } from '@nestjs/common';
import { SystemMenuService } from './system-menu.service';
import { SystemMenuController } from './system-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemMenu } from './entities/system-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemMenu])],
  controllers: [SystemMenuController],
  providers: [SystemMenuService],
})
export class SystemMenuModule {}
